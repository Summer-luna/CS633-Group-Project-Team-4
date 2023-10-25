import { Controller, Post, Body, Delete } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { UserOnCourse } from '@prisma/client';
import { AddCourseDto } from '../course/dto/course.dto';
import { DeleteCourseDto } from './dto/instructor.dto';

@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post('/course/add')
  async signUp(@Body() course: AddCourseDto): Promise<UserOnCourse> {
    return this.instructorService.createCourse(course);
  }

  @Delete('/course/delete')
  async deleteCourse(@Body() input: DeleteCourseDto) {
    return this.instructorService.deleteCourse(input);
  }
}
