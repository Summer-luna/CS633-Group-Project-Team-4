import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Course, Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CourseService } from '../course/course.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private readonly courseService: CourseService) {}

  private readonly SALT_ROUNDS = 15;

  async createUser(newUser: Prisma.UserCreateInput): Promise<User> {
    const userCount = await this.prisma.user.count({
      where: {
        OR: [{ email: newUser.email, buID: newUser.buID }]
      }
    });

    if (userCount !== 0) {
      throw new Error('User already exist in the database.');
    }

    const pwdHash = newUser.password ? await bcrypt.hash(newUser.password, this.SALT_ROUNDS) : null;

    return this.prisma.user.create({
      data: {
        email: newUser.email,
        lastName: newUser.lastName,
        firstName: newUser.firstName,
        buID: newUser.buID,
        role: newUser.role,
        password: pwdHash
      }
    });
  }

  async validUserData(inputEmail: string, inputPassword: string): Promise<User> {
    const targetUser = await this.prisma.user.findUnique({
      where: {
        email: inputEmail
      }
    });
    const checker = await bcrypt.compare(inputPassword, targetUser.password);
    if (targetUser && checker) return targetUser;
    return null;
  }

  async getUserByIdWithCourses(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        courses: {
          include: {
            Course: {
              include: {
                semester: true
              }
            }
          }
        }
      }
    });
  }

  async getCourseById(id: string): Promise<Course> {
    return this.courseService.getCourseById(id);
  }

  async getAllStudents() {
    return this.prisma.user.findMany({
      where: {
        role: 0
      }
    });
  }

  async getAllStudentsByCourseId(courseId: string) {
    const userList = await this.prisma.userOnCourse.findMany({
      where: {
        courseId: courseId,
        User: {
          role: 0
        }
      },
      include: {
        User: true
      }
    });

    return userList.map((user) => {
      return user.User.email;
    });
  }
}
