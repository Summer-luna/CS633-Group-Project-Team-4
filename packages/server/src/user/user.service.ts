import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private readonly SALT_ROUNDS = 15;

  // creating function for new user to sign up their account
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

  // check if user input the correct email and password for log in action
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

  // function to update user information. Both student and instructor can use this function
  async updateUser(user: UpdateUserDto): Promise<User> {
    const updateUser = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        buID: user.buID,
        role: user.role
      }
    });
    return updateUser;
  }
}
