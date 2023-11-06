import { Injectable } from '@nestjs/common';
import { CourseService } from '../course/course.service';
import { CheckInDto, DeleteCourseDto, AttendanceTypeEditDto } from '../course/dto/course.dto';
import { Attendance, UserOnCourse } from '@prisma/client';
import { UserOnCourseModel } from '../course/model/course.model';

@Injectable()
export class StudentService {
  constructor(private readonly courseService: CourseService) {}

  async studentEnroll(input: CheckInDto): Promise<UserOnCourse> {
    return this.courseService.studentEnroll(input);
  }

  async dropCourse(input: DeleteCourseDto): Promise<UserOnCourseModel> {
    return this.courseService.dropCourse(input);
  }

  async takeAttendance(input: AttendanceTypeEditDto): Promise<Attendance> {
    return this.courseService.takeAttendance(input);
  }
}
