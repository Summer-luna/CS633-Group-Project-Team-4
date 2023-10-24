import { Body, Controller, Post, Get, HttpCode, HttpStatus, Request, UseGuards, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { AddCourseDto, DeleteCourseDto, GetCourseByNameDto, UpdateCourseDto } from './dto/course.dto';
import { CourseModel } from './model/course.model';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // update the course information
  @Put('/update')
  async updateCourse(@Body() updateCourse: UpdateCourseDto) {
    return await this.courseService.updateCourse(updateCourse);
  }

  @Get('/getbyname')
  async getCourseByName(@Body() getCourse: GetCourseByNameDto) {
    return await this.courseService.getCourseByName(getCourse);
  }

  // list all course which user enroll(the course which has already been over will not show on the list)
  @Get('/getbyuser')
  async getCourseListByUser(@Body() getCourse: GetCourseListByUserDto) {
    return await this.courseService.getAllCourseByUser(getCourse);
  }
}
