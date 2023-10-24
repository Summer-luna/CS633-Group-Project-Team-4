import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

// input for instructor to enroll the target course
@InputType()
export class CheckInDto {
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

  @IsNotEmpty()
  @IsString()
  @Field()
  userId: string;

  @IsNumber()
  @Field()
  joinCode: number;

  @IsNumber()
  @Field()
  attendanceCode: number;
}

// input for instructor to remove student from target course
@InputType()
export class DeleteStudentDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @Field()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  courseId: string;
}

// input for instructor to cancel the course, and list all students from target course
@InputType()
export class CourseFunctionDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @Field()
  courseId: string;
}

// input to set attendence code for target course
@InputType()
export class SetAttendenceCodeDto {
  @IsDefined()
  @IsString()
  @Field()
  courseId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  attendanceCode: string;
}

// input to edit student's attendence state
@InputType()
export class EditAttendenceStateDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Field()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  attendanceType: number;
}
