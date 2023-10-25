import { Injectable, Logger } from '@nestjs/common';
import { UserOnCourse } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CourseService } from 'src/course/course.service';
import { CourseFunctionDto, CheckInDto, DeleteStudentDto, SetAttendenceCodeDto, EditAttendenceStateDto } from './dto/instructor.dto';

@Injectable()
export class InstructorService {
  constructor(private prisma: PrismaService, private readonly courseService: CourseService) {}
  private readonly logger = new Logger(InstructorService.name);

  // function to make professor enroll the course, if the class is not in the database, system will add it in to course table
  // before instructor enroll in the course
  async checkIn(course: CheckInDto): Promise<UserOnCourse> {
    const newCourse = await this.courseService.addCourse(course);
    const courseID = !newCourse ? (await this.courseService.getUniqueCourse(course)).id : newCourse.id;
    return this.prisma.userOnCourse.create({
      data: {
        userId: course.userId,
        courseId: courseID
      }
    });
  }

  // remove student from the target course
  async deleteStudent(studentInform: DeleteStudentDto) {
    await this.prisma.userOnCourse.delete({
      where: {
        courseId_userId: studentInform
      }
    });
  }

  // cancel course (remore all user from the target course)
  async cancelCourse(courseInform: CourseFunctionDto) {
    await this.prisma.userOnCourse.deleteMany({
      where: {
        courseId: courseInform.courseId
      }
    });
    this.courseService.deleteCourse(courseInform.courseId);
  }

  // list all students who enroll in target course successfully
  async getStudentListFromCourse(courseInform: CourseFunctionDto) {
    const studentList = await this.prisma.userOnCourse.findMany({
      where: {
        courseId: courseInform.courseId
      },
      include: {
        User: {
          select: {
            id: true,
            email: true,
            lastName: true,
            firstName: true,
            buID: true,
            role: true
          }
        }
      }
    });
    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].User.role == 0) {
        studentList.splice(i, 1);
      }
    }
    return studentList;
  }

  // set attendence code for student
  async setAttendenceCode(inform: SetAttendenceCodeDto) {
    if (inform.attendanceCode.length != 4) return 'Attendence Code should be 4 characters with digits or letters';
  }

  async deleteCourse(input: DeleteCourseDto): Promise<CourseModel> {
    // delete course
    return this.courseService.deleteCourse(input);
  }
}
