import { Injectable } from '@nestjs/common';
import { AddCourseDto, DeleteCourseDto, GetCourseByNameDto } from './dto/course.dto';
import { PrismaService } from 'nestjs-prisma';
import { Course, Prisma } from '@prisma/client';
import * as randomatic from 'randomatic';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}
  async addCourse(course: AddCourseDto): Promise<Course> {
    const courseCount = await this.prisma.course.count({
      where: {
        OR: [{ name: course.name, semesterId: course.semesterId, startDate: course.startDate, endDate: course.endDate }]
      }
    });

    if (courseCount !== 0) {
      throw new Error('Course already exist in the database.');
    }

    const joinCode = await this.generateRandomCode();

    return this.prisma.course.create({
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
    const targetCourse = await this.prisma.course.findFirst({
      where: {
        name: course.name,
        semesterId: course.semesterId,
        startDate: course.startDate,
        endDate: course.endDate
      }
    });
    return targetCourse;
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

  async generateRandomCode(): Promise<number> {
    // Generate a random six-digit code
    return randomatic('0', 6);
  }
}
