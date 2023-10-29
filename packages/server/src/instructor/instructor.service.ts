import { Injectable, Logger } from '@nestjs/common';
import { UserOnCourse } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CourseService } from 'src/course/course.service';
import { AddCourseDto, DeleteCourseDto } from '../course/dto/course.dto';
import { CourseModel } from '../course/model/course.model';

@Injectable()
export class InstructorService {
  constructor(private prisma: PrismaService, private readonly courseService: CourseService) {}
  private readonly logger = new Logger(InstructorService.name);
  async createCourse(course: AddCourseDto): Promise<UserOnCourse> {
    return this.courseService.addCourse(course);
  }

  async deleteCourse(input: DeleteCourseDto): Promise<CourseModel> {
    return this.courseService.deleteCourse(input);
  }

  async getCourseById(courseId: string): Promise<UserOnCourse[]> {
    return this.courseService.getCourseById(courseId);
  }
}
