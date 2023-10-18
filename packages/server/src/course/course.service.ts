import { Injectable } from '@nestjs/common';
import { GetCourseByNameDto, GetCourseListByUserDto, UpdateCourseDto } from './dto/course.dto';
import { PrismaService } from 'nestjs-prisma';
import { Course, Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  // the function which can add course into the database (working with "chechIn" function in instroctor.service)
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

  // function to help instructor update the course information.
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

  async deleteCourse(courseId: string) {
    await this.prisma.course.delete({
      where: {
        id: courseId
      }
    });
  }

  // function to search the course by course's name
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

  // function to check the detail information of target course (working with "checkIn" function in Instructor.service)
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

  //this function can help to list all enroll course for target user.
  //(if the course has already been over, it will not on the result list)
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
