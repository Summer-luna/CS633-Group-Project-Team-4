import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'nestjs-prisma';
import { JwtModule } from '../jwt/jwt.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [JwtModule, CourseModule],
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
