import { Controller, Post, Body, Delete, UseGuards, Get, Param, Put } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { UserOnCourse } from '@prisma/client';
import { AddCourseDto, GetAttendanceCodeDto, HandleUploadRosterDto } from '../course/dto/course.dto';
import { DeleteCourseDto } from './dto/instructor.dto';
import { Role } from '../auth/enum/role.enum';
import { Roles } from '../auth/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { CourseService } from '../course/course.service';
import { UserService } from '../user/user.service';
import { AttendanceTypeUpdateDto, GetStudentAttendanceStateListDto } from '../attendance/dto/attendance.dto';
import { AttendanceService } from '../attendance/attendance.service';

@Controller('instructor')
export class InstructorController {
  constructor(
    private readonly instructorService: InstructorService,
    private readonly attendanceService: AttendanceService,
    private readonly courseService: CourseService,
    private readonly userService: UserService
  ) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Professor)
  @Post('/course/add')
  async createCourse(@Body() course: AddCourseDto): Promise<UserOnCourse> {
    return this.courseService.addCourse(course);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Professor)
  @Delete('/course/delete')
  async deleteCourse(@Body() input: DeleteCourseDto) {
    return this.courseService.deleteCourse(input);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Professor)
  @Get('/course/:id')
  async getCourseById(@Param() input: { id: string }): Promise<UserOnCourse[]> {
    const { id } = input;
    return this.courseService.getStudentsByCourseId(id);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Professor)
  @Put('/attendance/update')
  async createAttendance(@Body() input: GetAttendanceCodeDto) {
    return this.courseService.updateAttendanceCode(input);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Professor)
  @Post('/attendance/markAbsence')
  async markAbsence(@Body() input: string) {
    return this.attendanceService.markAbsence(input);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Professor)
  @Post('/attendance/report')
  async getAttendanceByDateRange(@Body() input: GetStudentAttendanceStateListDto) {
    return this.attendanceService.getStudentAttendanceStateList(input);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Professor)
  @Put('/attendance/report/update')
  async updateAttendanceState(@Body() input: AttendanceTypeUpdateDto) {
    return this.attendanceService.updateAttendanceState(input);
  }

  @Post('/updateRoster')
  async handleUploadStudentRoster(@Body() input: HandleUploadRosterDto) {
    const { joinCode, courseId, studentList } = input;

    // fetch student exist in the database
    const existsStudentList = await this.userService.getAllStudents();

    // compare student email to check if the student already exist in the database
    const existsStudentEmailList = existsStudentList.map((student) => student.email);

    // filter out the student that already exist in the database
    const newStudentList = studentList.filter((student) => !existsStudentEmailList.includes(student.email));
    const studentRosterEmailList = studentList.map((student) => student.email);

    const enrollPromises = [];

    // create account for new student and enrolled them to the course
    for (const student of newStudentList) {
      const newUser = {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        buID: student.buID,
        password: '12345',
        role: 0
      };

      const newStudent = await this.userService.createUser(newUser);

      // enroll student to the course
      const enrollPromise = this.courseService.studentEnroll({ joinCode: joinCode, studentId: newStudent.id });
      enrollPromises.push(enrollPromise);
    }

    // Wait for all studentEnroll promises to resolve
    await Promise.all(enrollPromises);

    // fetch student that already enrolled in the course
    const studentInCourse = await this.userService.getAllStudentsByCourseId(courseId);

    // compare student email to check if the student already enrolled in the course
    const studentInRosterNotInCourse = studentList
      .filter((student) => !studentInCourse.includes(student.email))
      .map((student) => {
        const studentData = existsStudentList.find((s) => {
          return s.email === student.email;
        });
        return {
          courseId: courseId,
          userId: studentData.id
        };
      });

    for (const student of studentInRosterNotInCourse) {
      await this.courseService.studentEnroll({ joinCode: joinCode, studentId: student.userId });
    }

    const studentInCourseNotInRoster = studentInCourse
      .filter((email) => !studentRosterEmailList.includes(email))
      .map((email) => {
        const studentData = existsStudentList.find((s) => s.email === email);
        return {
          courseId: courseId,
          userId: studentData.id
        };
      });

    for (const student of studentInCourseNotInRoster) {
      await this.courseService.dropCourse({ courseId: student.courseId, userId: student.userId });
    }
  }
}
