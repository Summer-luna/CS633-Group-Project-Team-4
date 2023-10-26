import { Body, Controller, Delete, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CheckInDto, DeleteCourseDto } from '../course/dto/course.dto';
import { UserOnCourse } from '@prisma/client';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/enroll')
  async studentEnroll(@Body() input: CheckInDto): Promise<UserOnCourse> {
    return this.studentService.studentEnroll(input);
  }

  @Delete('/drop')
  async dropCourse(@Body() input: DeleteCourseDto): Promise<UserOnCourse> {
    return this.studentService.dropCourse(input);
  }
}
