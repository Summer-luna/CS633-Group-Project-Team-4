import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  providers: [CourseService, PrismaService],
  controllers: [CourseController],
  exports: [CourseService]
})
export class CourseModule {}
