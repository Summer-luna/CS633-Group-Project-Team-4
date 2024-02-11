import { Module } from '@nestjs/common';
import { CourseModule } from 'src/course/course.module';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { PrismaService } from 'nestjs-prisma';
import { UserModule } from '../user/user.module';
import { AttendanceModule } from '../attendance/attendance.module';

@Module({
  imports: [CourseModule, UserModule, AttendanceModule],
  providers: [InstructorService, PrismaService],
  controllers: [InstructorController],
  exports: [InstructorService]
})
export class InstructorModule {}
