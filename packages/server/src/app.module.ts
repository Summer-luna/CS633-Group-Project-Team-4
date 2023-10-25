import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from './jwt/jwt.module';
import { CourseModule } from './course/course.module';
import { InstructorModule } from './instructor/instructor.module';

@Module({
  imports: [UserModule, AuthModule, InstructorModule, CourseModule, JwtModule, ConfigModule.forRoot({ isGlobal: true })]
})
export class AppModule {}
