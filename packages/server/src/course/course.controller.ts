import { Body, Controller, Post, Get, HttpCode, HttpStatus, Request, UseGuards, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { AddCourseDto, DeleteCourseDto, GetCourseByNameDto, UpdateCourseDto } from './dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly classService: CourseService) {}

  @Post('/add')
  async addCourse(@Body() newClass: AddCourseDto) {
    return await this.classService.addCourse(newClass);
  }

  @Put('/update')
  async updateCourse(@Body() updateCourse: UpdateCourseDto) {
    return await this.classService.updateCourse(updateCourse);
  }

  @Delete('/delete')
  async deleteCourse(@Body() deleteCourse: DeleteCourseDto) {
    return await this.classService.deleteCourse(deleteCourse);
  }

  @Get('/getbyname')
  async getCourseByName(@Body() getCourse: GetCourseByNameDto) {
    return await this.classService.getCourseByName(getCourse);
  }
}
