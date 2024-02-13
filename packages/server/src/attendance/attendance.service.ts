import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AttendanceTypeCheckDto, AttendanceTypeInputDto, AttendanceTypeUpdateDto, GetStudentAttendanceStateListDto } from './dto/attendance.dto';
import { Attendance } from '@prisma/client';
import { CourseService } from '../course/course.service';
import { AttendanceModel } from '../course/model/course.model';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService, private readonly courseService: CourseService) {}

  async checkAttendance(input: AttendanceTypeCheckDto): Promise<Attendance> {
    const { userId, classId } = input;
    const date = new Date();
    const { today, tomorrow } = this.getTodayAndYesterday(date);

    return this.prisma.attendance.findFirst({
      where: {
        userId: userId,
        classId: classId,
        created: {
          gte: today,
          lt: tomorrow // Next day
        }
      }
    });
  }

  async takeAttendance(attendInform: AttendanceTypeInputDto): Promise<Attendance> {
    const isExist = await this.checkAttendance(attendInform);
    const isMatched = await this.verifyAttendanceCode(attendInform.attendanceCode, attendInform.classId);
    const attendanceType = isMatched ? 0 : 1;

    if (isExist) {
      throw new Error('Already checked in');
    }

    return this.prisma.attendance.create({
      data: {
        userId: attendInform.userId,
        classId: attendInform.classId,
        attendanceType: attendanceType
      }
    });
  }

  async verifyAttendanceCode(code: string, classId: string): Promise<boolean> {
    const correctCode = await this.courseService.getAttendanceCode(classId);
    return correctCode && code === correctCode;
  }

  async markAbsence(courseId: string) {
    const date = new Date();
    const { today, tomorrow } = this.getTodayAndYesterday(date);

    const studentList = await this.courseService.getStudentList({ id: courseId, today: today, tomorrow: tomorrow });

    const attendanceData = studentList.map((student) => {
      return {
        userId: student.userId,
        classId: student.courseId,
        attendanceType: 1
      };
    });

    return this.prisma.attendance.createMany({
      data: attendanceData
    });
  }

  async getStudentAttendanceStateList(inform: GetStudentAttendanceStateListDto): Promise<AttendanceModel[]> {
    const res = await this.prisma.attendance.findMany({
      where: {
        classId: inform.classId,
        created: {
          gte: inform.startDate,
          lte: inform.endDate
        }
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            buID: true
          }
        }
      }
    });

    return res.map((attendance) => {
      return {
        id: attendance.id,
        attendanceType: attendance.attendanceType,
        created: attendance.created,
        firstName: attendance.user.firstName,
        lastName: attendance.user.lastName,
        fullName: `${attendance.user.lastName} ${attendance.user.firstName}`,
        buID: attendance.user.buID,
        classId: attendance.classId,
        userId: attendance.userId
      };
    });
  }

  async updateAttendanceState(input: AttendanceTypeUpdateDto): Promise<Attendance> {
    const { id, attendanceType } = input;

    return this.prisma.attendance.update({
      where: {
        id: id
      },
      data: {
        attendanceType: attendanceType
      }
    });
  }

  getTodayAndYesterday = (today: Date) => {
    today.setHours(0, 0, 0, 0);
    return { today: today, tomorrow: new Date(today.getTime() + 24 * 60 * 60 * 1000) };
  };
}
