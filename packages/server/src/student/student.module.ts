import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { CourseModule } from '../course/course.module';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [CourseModule, JwtModule],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
