import { Module } from '@nestjs/common';
import { CourseModule } from 'src/course/course.module';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { PrismaService } from 'nestjs-prisma';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [CourseModule, JwtModule],
  providers: [InstructorService, PrismaService],
  controllers: [InstructorController],
  exports: [InstructorService]
})
export class InstructorModule {}
