import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from './jwt/jwt.module';
import { CourseModule } from './course/course.module';
import { InstructorModule } from './instructor/instructor.module';
import { StudentModule } from './student/student.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [UserModule, AuthModule, InstructorModule, CourseModule, JwtModule, ConfigModule.forRoot({ isGlobal: true }), StudentModule, AttendanceModule]
})
export class AppModule {}
