import { Field, InputType, InputType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString, IsDate } from 'class-validator';

@InputType()
export class AddCourseDto {
  @IsDefined()
  @IsString()
  @Field()
  userId: string;

  @IsDefined()
  @IsString()
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @Field()
  description: string;

  @IsString()
  @Field()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  semesterId: number;

  @IsDateString()
  @Field()
  startDate: Date;

  @IsDateString()
  @Field()
  endDate: Date;
}

@InputType()
export class UpdateCourseDto {
  @IsDefined()
  @IsString()
  @Field()
  id: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @Field()
  description: string;

  @IsString()
  @Field()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  semesterId: number;

  @IsDateString()
  @Field()
  startDate: Date;

  @IsDateString()
  @Field()
  endDate: Date;
}

@InputType()
export class DeleteCourseDto {
  @IsDefined()
  @IsString()
  @Field()
  userId: string;

  @IsDefined()
  @IsString()
  @Field()
  courseId: string;
}

@InputType()
export class GetCourseByNameDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;
}

@InputType()
export class CheckInDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  joinCode: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  studentId: string;
}

@InputType()
export class AttendanceTypeEditDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  attendanceCode: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  classId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  userId: string;

  @IsString()
  @Field()
  attendanceId: string;
}

@InputType()
export class GetAttendanceCodeDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  classId: string;
}

@InputType()
export class GetStudentAttendanceStateListDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  classId: string;

  @IsDate()
  @Field()
  startDate: Date;

  @IsDate()
  @Field()
  endDate: Date;
}
