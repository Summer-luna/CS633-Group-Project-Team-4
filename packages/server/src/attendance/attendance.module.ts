import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CourseModule } from '../course/course.module';
import { PrismaService } from 'nestjs-prisma';

@Module({
  imports: [CourseModule],
  providers: [AttendanceService, PrismaService],
  exports: [AttendanceService]
})
export class AttendanceModule {}
