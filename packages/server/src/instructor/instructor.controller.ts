import { Controller, Post, Body, Delete, Get } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CourseFunctionDto, CheckInDto, DeleteStudentDto } from './dto/instructor.dto';
import { UserOnCourse } from '@prisma/client';

@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post('/checkin')
  async signUp(@Body() instructor: CheckInDto): Promise<UserOnCourse> {
    return await this.instructorService.checkIn(instructor);
  }

  @Delete('/deletestudent')
  async deleteStudent(@Body() deleteStudent: DeleteStudentDto) {
    return await this.instructorService.deleteStudent(deleteStudent);
  }

  @Delete('/deletecourse')
  async cancelCourse(@Body() courseInform: CourseFunctionDto) {
    return await this.instructorService.cancelCourse(courseInform);
  }

  @Get('/getstudentlistbycourse')
  async getCourseListByUser(@Body() courseInform: CourseFunctionDto) {
    return await this.instructorService.getStudentListFromCourse(courseInform);
  }
}
