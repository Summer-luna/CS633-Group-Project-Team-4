import { Injectable, Logger } from '@nestjs/common';
import { UserOnCourse } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CourseService } from 'src/course/course.service';
import { CheckInDto } from './dto/instructor.dto';

@Injectable()
export class InstructorService {
  constructor(private prisma: PrismaService, private readonly courseService: CourseService) {}
  private readonly logger = new Logger(InstructorService.name);
  async checkin(course: CheckInDto): Promise<UserOnCourse> {
    const newCourse = await this.courseService.addCourse(course);
    const courseID = !newCourse ? (await this.courseService.getUniqueCourse(course)).id : newCourse.id;
    return this.prisma.userOnCourse.create({
      data: {
        userId: course.userId,
        courseId: courseID
      }
    });
  }
}
