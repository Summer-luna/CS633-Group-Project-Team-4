import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CourseService } from 'src/course/course.service';
import { CheckInDto, FindCourseDto, TakeAttendenceDto } from './dto/student.dto';
import { Course, Prisma, UserOnCourse } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService, private readonly courseService: CourseService) {}

  async studentEnroll(inform: CheckInDto): Promise<UserOnCourse> {
    const targetCourse = await this.prisma.course.findFirst({
      where: {
        joinCode: inform.joinCode
      }
    });
    return this.prisma.userOnCourse.create({
      data: {
        userId: inform.studentId,
        courseId: targetCourse.id
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

  async takeAttendence(inform: TakeAttendenceDto) {
    const attendanceType = 0;
    const attendenceInform = await this.prisma.attendance.create({
      data: {
        classId: inform.courseId,
        userId: inform.userId,
        attendanceType: attendanceType
      }
    });

    return attendenceInform;
  }
}
