import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// input for instructor to enroll the target course
@InputType()
export class CheckInDto {
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @Field()
  joinCode: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  studentId: string;
}

@InputType()
export class FindCourseDto {
  @IsString()
  @Field()
  name: string;
}

@InputType()
export class TakeAttendenceDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Field()
  courseId: string;

  @IsString()
  @Field()
  userId: string;
}
