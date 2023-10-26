import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from './jwt/jwt.module';
import { CourseModule } from './course/course.module';
import { InstructorModule } from './instructor/instructor.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [UserModule, AuthModule, InstructorModule, CourseModule, JwtModule, StudentModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
  imports: [UserModule, AuthModule, InstructorModule, CourseModule, JwtModule, ConfigModule.forRoot({ isGlobal: true }), StudentModule]
})
export class AppModule {}
