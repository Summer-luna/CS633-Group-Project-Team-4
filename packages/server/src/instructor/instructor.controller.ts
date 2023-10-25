import { Controller, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { UserOnCourse } from '@prisma/client';
import { AddCourseDto } from '../course/dto/course.dto';
import { DeleteCourseDto } from './dto/instructor.dto';
import { Role } from '../auth/enum/role.enum';
import { Roles } from '../auth/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';

@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Professor)
  @Post('/course/add')
  async signUp(@Body() course: AddCourseDto): Promise<UserOnCourse> {
    return this.instructorService.createCourse(course);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Professor)
  @Delete('/course/delete')
  async deleteCourse(@Body() input: DeleteCourseDto) {
    return this.instructorService.deleteCourse(input);
  }
}
