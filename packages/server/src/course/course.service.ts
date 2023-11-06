import { Injectable } from '@nestjs/common';
import { AddCourseDto, CheckInDto, DeleteCourseDto, GetCourseByNameDto, AttendanceTypeEditDto, GetAttendanceCodeDto } from './dto/course.dto';
import { PrismaService } from 'nestjs-prisma';
import { Attendance, Course, Prisma, UserOnCourse } from '@prisma/client';
import * as randomatic from 'randomatic';
import { UserOnCourseModel } from './model/course.model';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async addCourse(course: AddCourseDto): Promise<UserOnCourseModel> {
    // Generate a new join code and attendance code if the generated code already exists in the database
    const joinCode = await this.generateUniqueJoinCode(6);

    const courseCount = await this.prisma.course.count({
      where: {
        OR: [{ name: course.name, semesterId: course.semesterId, startDate: course.startDate, endDate: course.endDate }]
      }
    });

    if (courseCount !== 0) {
      throw new Error('Course already exist in the database.');
    }

    const newCourse = await this.prisma.course.create({
      data: {
        name: course.name,
        joinCode: joinCode,
        description: course.description,
        location: course.location,
        semesterId: course.semesterId,
        startDate: course.startDate,
        endDate: course.endDate
      }
    });

    return this.prisma.userOnCourse.create({
      data: {
        userId: course.userId,
        courseId: newCourse.id
      },
      include: {
        Course: true
      }
    });
  }

  async studentEnroll(input: CheckInDto): Promise<UserOnCourse> {
    const targetCourse = await this.prisma.course.findUnique({
      where: {
        joinCode: input.joinCode
      }
    });

    return this.prisma.userOnCourse.create({
      data: {
        userId: input.studentId,
        courseId: targetCourse.id
      },
      include: {
        Course: true
      }
    });
  }

  async checkDuplicateAttendanceCode(attendanceCode: string): Promise<boolean> {
    const courseAttendanceCodeCount = await this.prisma.course.count({
      where: {
        attendanceCode: attendanceCode
      }
    });

    return courseAttendanceCodeCount !== 0;
  }

  async checkDuplicateJoinCode(joinCode: string): Promise<boolean> {
    const courseJoinCodeCount = await this.prisma.course.count({
      where: {
        joinCode: joinCode
      }
    });

    return courseJoinCodeCount !== 0;
  }

  async updateCourse(course: Prisma.CourseUncheckedUpdateInput): Promise<Course> {
    return this.prisma.course.update({
      where: {
        id: course.id.toString()
      },
      data: {
        name: course.name,
        description: course.description,
        location: course.location,
        semesterId: course.semesterId,
        startDate: course.startDate,
        endDate: course.endDate
      }
    });
  }

  async deleteCourse(input: DeleteCourseDto): Promise<Course> {
    try {
      await this.dropCourse(input);

      return this.prisma.course.delete({
        where: {
          id: input.courseId
        }
      });
    } catch (error) {
      throw new Error('Unable to delete course');
    }
  }

  async getCourseByName(courseName: GetCourseByNameDto): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: {
        name: courseName.name,
        endDate: {
          gt: new Date().toISOString()
        }
      }
    });
  }

  async getStudentsByCourseId(courseId: string): Promise<UserOnCourse[]> {
    return this.prisma.userOnCourse.findMany({
      where: {
        courseId: courseId,
        User: {
          role: 0
        }
      },
      include: {
        Course: true,
        User: true
      }
    });
  }

  async getCourseById(courseId: string): Promise<Course> {
    return this.prisma.course.findUnique({
      where: {
        id: courseId
      }
    });
  }

  async getUniqueCourse(course: Prisma.CourseWhereInput): Promise<Course> {
    return this.prisma.course.findFirst({
      where: {
        name: course.name,
        semesterId: course.semesterId,
        startDate: course.startDate,
        endDate: course.endDate
      }
    });
  }

  async getAllCourses(): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: {
        endDate: {
          gt: new Date().toISOString()
        }
      }
    });
  }

  async dropCourse(input: DeleteCourseDto): Promise<UserOnCourseModel> {
    return this.prisma.userOnCourse.delete({
      where: {
        courseId_userId: {
          courseId: input.courseId,
          userId: input.userId
        }
      }
    });
  }

  async generateUniqueJoinCode(size: number): Promise<string> {
    let joinCode = await this.generateRandomCode(size);
    let isDuplicateJoinCode = true;

    while (isDuplicateJoinCode) {
      isDuplicateJoinCode = await this.checkDuplicateJoinCode(joinCode);
      joinCode = await this.generateRandomCode(size);
    }

    return joinCode;
  }

  async takeAttendance(attendInform: AttendanceTypeEditDto): Promise<Attendance> {
    if (!this.checkAttendanceCode(attendInform.attendanceCode, attendInform.classId)) {
      throw new Error('AttendanceCode is incorrect!');
    }
    const currentId = await this.prisma.attendance.findFirst({
      select: {
        id: true
      },
      where: {
        userId: attendInform.userId,
        classId: attendInform.classId,
        attendanceType: null
      }
    });
    return this.updateAttendanceState(currentId.id, 0);
  }

  async generateRandomCode(size: number): Promise<string> {
    return randomatic('0', size);
  }

  async checkAttendanceCode(code: string, classId: string): Promise<boolean> {
    const correctCode = await this.prisma.course.findFirst({
      select: {
        attendanceCode: true
      },
      where: {
        id: classId
      }
    });
    if (code == correctCode.attendanceCode) {
      return true;
    }
    return false;
  }

  async updateAttendanceState(id: string, attendanceType: number): Promise<Attendance> {
    return this.prisma.attendance.update({
      where: {
        id: id
      },
      data: {
        attendanceType: attendanceType
      }
    });
  }

  async getAttendanceCode(id: GetAttendanceCodeDto): Promise<string> {
    const attendanceCode = await this.prisma.course.findFirst({
      where: {
        id: id.classId
      }
    });
    return attendanceCode.attendanceCode;
  }

  async addAttendanceList(id: string) {
    const userList = await this.prisma.userOnCourse.findMany({
      where: {
        courseId: id
      }
    });
    let createData: Prisma.AttendanceCreateManyInput;
    let createList = new Array();
    for (let user in userList) {
      createData = {
        userId: user,
        classId: id,
        attendanceType: null
      };
      createList.push(createData);
    }

    return this.prisma.attendance.createMany({ data: createList });
  }

  async updateAttendanceCode(input: GetAttendanceCodeDto) {
    const { classId, attendanceCode } = input;
    return this.prisma.course.update({
      where: {
        id: classId
      },
      data: {
        attendanceCode: attendanceCode
      }
    });
  }

  // async updateAttendanceStateForMissingStudent(id: string) {
  //   await this.initAttendanceCode(id);
  //   return this.prisma.attendance.updateMany({
  //     where: {
  //       attendanceType: null
  //     },
  //     data: {
  //       attendanceType: 1
  //     }
  //   });
  // }
}
