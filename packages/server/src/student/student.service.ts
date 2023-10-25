import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CourseService } from 'src/course/course.service';
import { CheckInDto, FindCourseDto } from './dto/student.dto';
import { Course, Prisma, UserOnCourse } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService, private readonly courseService: CourseService) {}

  async studentEnroll(inform: CheckInDto): Promise<UserOnCourse> {
    return await this.prisma.userOnCourse.create({
      data: {
        userId: inform.studentId,
        courseId: inform.courseId
      }
    });
  }

  async findCourse(courseInform: Prisma.CourseWhereInput): Promise<Course[]> {
    const courseList = await this.prisma.course.findMany({
      where: {
        name: courseInform.name,
        endDate: {
          gt: new Date().toISOString()
        }
      }
    });

    return courseList;
  }
}
