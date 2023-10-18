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
