import { Injectable } from '@nestjs/common';
import { AddCourseDto, DeleteCourseDto, GetCourseByNameDto } from './dto/course.dto';
import { PrismaService } from 'nestjs-prisma';
import { Course, Prisma } from '@prisma/client';
import * as randomatic from 'randomatic';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async addCourse(course: AddCourseDto): Promise<Course> {
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

    return this.prisma.course.create({
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

  async deleteCourse(course: DeleteCourseDto) {
    return this.prisma.course.delete({
      where: {
        id: course.id
      }
    });
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

  async generateRandomCode(size: number): Promise<string> {
    return randomatic('0', size);
  }
}
