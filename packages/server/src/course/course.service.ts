import { Injectable } from '@nestjs/common';
import { AddCourseDto, DeleteCourseDto, GetCourseByNameDto, GetCourseListByUserDto, UpdateCourseDto } from './dto/course.dto';
import { PrismaService } from 'nestjs-prisma';
import { Course, Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}
  async addCourse(course: Prisma.CourseUncheckedCreateInput): Promise<Course> {
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
        description: course.description,
        location: course.location,
        semesterId: course.semesterId,
        startDate: course.startDate,
        endDate: course.endDate
      }
    });
  }

  async updateCourse(course: Prisma.CourseUncheckedUpdateInput): Promise<Course> {
    const currentCourse = await this.prisma.course.update({
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
    return currentCourse;
  }

  async deleteCourse(course: DeleteCourseDto) {
    await this.prisma.course.delete({
      where: {
        id: course.id
      }
    });
  }

  async getCourseByName(courseName: GetCourseByNameDto): Promise<Course[]> {
    const targetCourse = await this.prisma.course.findMany({
      where: {
        name: courseName.name,
        endDate: {
          gt: new Date().toISOString()
        }
      }
    });
    return targetCourse;
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

  async getAllCourseByUser(userId: GetCourseListByUserDto) {
    const courseIdList = await this.prisma.userOnCourse.findMany({
      where: {
        userId: userId.userId
      },
      select: {
        Course: true
      }
    });
    for (let i = 0; i < courseIdList.length; i++) {
      if (courseIdList[i].Course.endDate < new Date()) {
        courseIdList.splice(i, 1);
      }
    }
    return courseIdList;
  }
}
