import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CourseService } from 'src/course/course.service';
import { CheckInDto } from './dto/student.dto';
import { UserOnCourse } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService, private readonly courseService: CourseService) {}

  async studentEnroll(inform: CheckInDto): Promise<UserOnCourse> {
    const courdeId = await this.prisma.course.findFirst({
      select: {
        id: true
      },
      where: {
        joinCode: inform.joinCode
      }
    })
    return this.prisma.userOnCourse.create({
      data: {
        userId: inform.studentId,
        courseId: courdeId.id
      }
    });
  }

}
