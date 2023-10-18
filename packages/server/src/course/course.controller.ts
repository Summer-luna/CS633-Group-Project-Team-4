import { Body, Controller, Post, Get, HttpCode, HttpStatus, Request, UseGuards, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { AddCourseDto, DeleteCourseDto, GetCourseByNameDto, GetCourseListByUserDto, UpdateCourseDto } from './dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('/add')
  async addCourse(@Body() newClass: AddCourseDto) {
    return await this.courseService.addCourse(newClass);
  }

  @Put('/update')
  async updateCourse(@Body() updateCourse: UpdateCourseDto) {
    return await this.courseService.updateCourse(updateCourse);
  }

  @Delete('/delete')
  async deleteCourse(@Body() deleteCourse: DeleteCourseDto) {
    return await this.courseService.deleteCourse(deleteCourse);
  }

  @Get('/getbyname')
  async getCourseByName(@Body() getCourse: GetCourseByNameDto) {
    return await this.courseService.getCourseByName(getCourse);
  }

  @Get('/getbyuser')
  async getCourseListByUser(@Body() getCourse: GetCourseListByUserDto) {
    return await this.courseService.getAllCourseByUser(getCourse);
  }
}
