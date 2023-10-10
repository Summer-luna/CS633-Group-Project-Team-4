import { Body, Controller, Post, Get, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { AddCourseDto } from './dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly classService: CourseService) {}

  @Post('/add')
  async addCourse(@Body() newClass: AddCourseDto) {
    return await this.classService.addCourse(newClass);
  }
}
