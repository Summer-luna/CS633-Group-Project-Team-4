import { Injectable } from '@nestjs/common';
import { AddCourseDto, CheckInDto, DeleteCourseDto, GetCourseByNameDto, AttendanceTypeEditDto } from './dto/course.dto';
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
    const attendanceCode = await this.generateUniqueAttendanceCode(4);

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
        attendanceCode: attendanceCode,
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

  async generateUniqueAttendanceCode(size: number): Promise<string> {
    let attendanceCode = await this.generateRandomCode(size);
    let isDuplicateAttendanceCode = true;

    while (isDuplicateAttendanceCode) {
      isDuplicateAttendanceCode = await this.checkDuplicateAttendanceCode(attendanceCode);
      attendanceCode = await this.generateRandomCode(size);
    }
    return attendanceCode;
  }

  async takeAttendence(attendInform: AttendanceTypeEditDto): Promise<Attendance> {
    if (!this.checkAttendenceCode(attendInform.attendenceCode, attendInform.classId)) {
      throw new Error('AttendenceCode is incorrect!');
    }
    const currentId = await this.prisma.attendance.findFirst({
      select: {
        id: true
      },
      where: {
        userId: attendInform.userId,
        classId: attendInform.classId,
        attendanceType: 1
      }
    });
    return this.updateAttendenceState(currentId.id, 0);
  }

  async generateRandomCode(size: number): Promise<string> {
    return randomatic('0', size);
  }

  async checkAttendenceCode(code: string, classId: string): Promise<boolean> {
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

  async updateAttendenceState(id: string, attendanceType: number): Promise<Attendance> {
    return await this.prisma.attendance.update({
      where: {
        id: id
      },
      data: {
        attendanceType: attendanceType
      }
    });
  }
}
