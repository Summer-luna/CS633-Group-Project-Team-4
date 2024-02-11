import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { AttendanceModule } from '../attendance/attendance.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [AttendanceModule, CourseModule],
  controllers: [StudentController]
})
export class StudentModule {}
