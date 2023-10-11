import { Injectable } from '@nestjs/common';
import { AddCourseDto, DeleteCourseDto, GetCourseByNameDto, UpdateCourseDto } from './dto/course.dto';
import { PrismaService } from 'nestjs-prisma';
import { Course } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}
  async addCourse(course: AddCourseDto): Promise<Course> {
    const courseCount = await this.prisma.course.count({
      where: {
        OR: [{ name: course.courseName, semesterId: course.semesterID }]
      }
    });

    if (courseCount !== 0) {
      throw new Error('Course already exist in the database.');
    }

    return this.prisma.course.create({
      data: {
        name: course.courseName,
        description: course.description,
        location: course.location,
        semesterId: course.semesterID,
        startDate: course.startDate,
        endDate: course.endDate
      }
    });
  }

  async updateCourse(course: UpdateCourseDto): Promise<Course> {
    const currentCourse = await this.prisma.course.update({
      where: {
        id: course.id
      },
      data: {
        name: course.courseName,
        description: course.description,
        location: course.location,
        semesterId: course.semesterID,
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

  async getCourseByName(course: GetCourseByNameDto): Promise<Course[]> {
    const targetCourse = await this.prisma.course.findMany({
      where: {
        name: course.courseName,
        endDate: {
          gt: new Date().toLocaleDateString()
        }
      }
    });
    return targetCourse;
  }
}
