import { Body, Controller, Post, Get, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { AddCourseDto, DeleteCourseDto, GetCourseByNameDto, UpdateCourseDto } from './dto/course.dto';
import { CourseModel, UserOnCourseModel } from './model/course.model';

@Controller('course')
export class CourseController {
  constructor(private readonly classService: CourseService) {}

  @Post('/add')
  async addCourse(@Body() newClass: AddCourseDto): Promise<UserOnCourseModel> {
    return this.classService.addCourse(newClass);
  }

  @Put('/update')
  async updateCourse(@Body() updateCourse: UpdateCourseDto): Promise<CourseModel> {
    return this.classService.updateCourse(updateCourse);
  }

  @Delete('/delete')
  async deleteCourse(@Body() deleteCourse: DeleteCourseDto) {
    return this.classService.deleteCourse(deleteCourse);
  }

  @Get('/getbyname')
  async getCourseByName(@Body() getCourse: GetCourseByNameDto): Promise<CourseModel[]> {
    return this.classService.getCourseByName(getCourse);
  }

  @Get('/getall')
  async getAllCourses() {
    return this.classService.getAllCourses();
  }
}
