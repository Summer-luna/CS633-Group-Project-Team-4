import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CheckInDto } from '../course/dto/course.dto';
import { UserOnCourse } from '@prisma/client';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/enroll')
  async studentEnroll(@Body() inform: CheckInDto): Promise<UserOnCourse> {
    return this.studentService.studentEnroll(inform);
  }
}
