import { Module } from '@nestjs/common';
import { CourseModule } from 'src/course/course.module';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  imports: [CourseModule],
  providers: [InstructorService, PrismaService],
  controllers: [InstructorController],
  exports: [InstructorService]
})
export class InstructorModule {}
