import { Injectable } from '@nestjs/common';
import { AddCourseDto, CheckInDto, DeleteCourseDto, EnrollManyDto, GetAttendanceCodeDto, GetCourseByNameDto } from './dto/course.dto';
import { PrismaService } from 'nestjs-prisma';
import { Course, Prisma, UserOnCourse } from '@prisma/client';
import { UserOnCourseModel } from './model/course.model';
import * as randomatic from 'randomatic';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  /**
   *
   * @param course
   */
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

  async studentEnrollMany(input: EnrollManyDto[]): Promise<any> {
    return this.prisma.userOnCourse.createMany({
      data: input
    });
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
      },
      include: {
        User: {
          where: {
            User: {
              role: 1
            }
          },
          include: {
            User: true
          }
        }
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

  async generateRandomCode(size: number): Promise<string> {
    return randomatic('0', size);
  }

  async getAttendanceCode(courseId: string): Promise<string> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId
      }
    });
    return course.attendanceCode;
  }

  async getStudentList(input: any): Promise<UserOnCourse[]> {
    const { id, today, tomorrow } = input;
    return this.prisma.userOnCourse.findMany({
      where: {
        courseId: id,
        User: {
          role: 0,
          Attendance: {
            none: {
              created: {
                gte: today,
                lt: tomorrow // Next day
              }
            }
          }
        }
      }
    });
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
}
