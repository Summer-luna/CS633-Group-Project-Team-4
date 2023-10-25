import { Module } from '@nestjs/common';
import { CourseModule } from 'src/course/course.module';
import { PrismaService } from 'nestjs-prisma';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  imports: [CourseModule],
  providers: [StudentService, PrismaService],
  controllers: [StudentController],
  exports: [StudentService]
})
export class StudentModule {}
