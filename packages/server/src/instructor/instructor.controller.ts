import { Controller, Post, Body } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CheckInDto } from './dto/instructor.dto';
import { UserOnCourse } from '@prisma/client';

@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post('/checkin')
  async signUp(@Body() instructor: CheckInDto): Promise<UserOnCourse> {
    return await this.instructorService.checkin(instructor);
  }
}
