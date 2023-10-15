import { Body, Controller, Post, Get, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { AddCourseDto, DeleteCourseDto, GetCourseByNameDto, UpdateCourseDto } from './dto/course.dto';
import { CourseModel } from './model/course.model';

@Controller('course')
export class CourseController {
  constructor(private readonly classService: CourseService) {}

  @Post('/add')
  async addCourse(@Body() newClass: AddCourseDto): Promise<CourseModel> {
    return await this.classService.addCourse(newClass);
  }

  @Put('/update')
  async updateCourse(@Body() updateCourse: UpdateCourseDto): Promise<CourseModel> {
    return await this.classService.updateCourse(updateCourse);
  }

  @Delete('/delete')
  async deleteCourse(@Body() deleteCourse: DeleteCourseDto) {
    return await this.classService.deleteCourse(deleteCourse);
  }

  @Get('/getbyname')
  async getCourseByName(@Body() getCourse: GetCourseByNameDto): Promise<CourseModel[]> {
    return await this.classService.getCourseByName(getCourse);
  }

  @Get('/getall')
  async getAllCourses() {
    return await this.classService.getAllCourses();
  }
}
