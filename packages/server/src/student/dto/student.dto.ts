import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// input for instructor to enroll the target course
@InputType()
export class CheckInDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Field()
  courseId: string;

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
