import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUserByIdWithCourses(@Param('id') id: string) {
    return await this.userService.getUserByIdWithCourses(id);
  }

  @Get('/course/:id')
  async getCourseById(@Param('id') id: string) {
    return this.userService.getCourseById(id);
  }
}
