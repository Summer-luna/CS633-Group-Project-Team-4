import { Injectable } from '@nestjs/common';
import { AddCourseDto, UpdateCourseDto } from './dto/course.dto';
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

  async updateCourse(course: UpdateCourseDto) {}
}
