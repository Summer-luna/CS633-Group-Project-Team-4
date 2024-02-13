import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CheckInDto, DeleteCourseDto } from '../course/dto/course.dto';
import { Attendance, UserOnCourse } from '@prisma/client';
import { AttendanceService } from '../attendance/attendance.service';
import { AttendanceTypeCheckDto, AttendanceTypeEditDto } from '../attendance/dto/attendance.dto';
import { CourseService } from '../course/course.service';

@Controller('student')
export class StudentController {
  constructor(private courseService: CourseService, private attendanceService: AttendanceService) {}

  @Post('/enroll')
  async studentEnroll(@Body() input: CheckInDto): Promise<UserOnCourse> {
    return this.courseService.studentEnroll(input);
  }

  @Delete('/drop')
  async dropCourse(@Body() input: DeleteCourseDto): Promise<UserOnCourse> {
    return this.courseService.dropCourse(input);
  }

  @Post('/takeAttendance')
  async takeAttendance(@Body() input: AttendanceTypeEditDto): Promise<Attendance> {
    return this.attendanceService.takeAttendance(input);
  }

  @Post('/checkAttendance')
  async checkAttendance(@Body() input: AttendanceTypeCheckDto): Promise<Attendance> {
    return this.attendanceService.checkAttendance(input);
  }
}
