import { Get } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';

@InputType()
export class AddCourseDto {
  @IsDefined()
  @IsString()
  @Field()
  courseName: string;

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
  semesterID: number;

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
  courseName: string;

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
  semesterID: number;

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
  id: string;
}

@InputType()
export class GetCourseByNameDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Field()
  courseName: string;
}
