import { Injectable } from '@nestjs/common';
import { CourseService } from '../course/course.service';
import { CheckInDto } from '../course/dto/course.dto';
import { UserOnCourse } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private readonly courseService: CourseService) {}

  async studentEnroll(inform: CheckInDto): Promise<UserOnCourse> {
    return this.courseService.studentEnroll(inform);
  }
}
