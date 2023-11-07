import { Body, Controller, Post, Get, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { AddCourseDto, DeleteCourseDto, GetAttendanceCodeDto, GetCourseByNameDto, UpdateCourseDto } from './dto/course.dto';
import { CourseModel, UserOnCourseModel } from './model/course.model';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('/add')
  async addCourse(@Body() newClass: AddCourseDto): Promise<UserOnCourseModel> {
    return this.courseService.addCourse(newClass);
  }

  @Put('/update')
  async updateCourse(@Body() updateCourse: UpdateCourseDto): Promise<CourseModel> {
    return this.courseService.updateCourse(updateCourse);
  }

  @Delete('/delete')
  async deleteCourse(@Body() deleteCourse: DeleteCourseDto) {
    return this.courseService.deleteCourse(deleteCourse);
  }

  @Get('/getbyname')
  async getCourseByName(@Body() getCourse: GetCourseByNameDto): Promise<CourseModel[]> {
    return this.courseService.getCourseByName(getCourse);
  }

  @Get('/getall')
  async getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Get('/getattendencecode')
  async getAttendanceCode(@Body() courseId: GetAttendanceCodeDto): Promise<string> {
    return this.courseService.getAttendanceCode(courseId);
  }

  @Post('/markAbsence')
  async markAbsence(@Body() input: { id: string }) {
    return this.courseService.markAbsence(input);
  }
}
