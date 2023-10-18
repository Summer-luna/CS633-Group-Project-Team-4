import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
