import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { Course, UserOnCourse } from '@prisma/client';
import { CheckInDto } from './dto/student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/checkin')
  async signUp(@Body() studentInform: CheckInDto): Promise<UserOnCourse> {
    return await this.studentService.studentEnroll(studentInform);
  }

}
