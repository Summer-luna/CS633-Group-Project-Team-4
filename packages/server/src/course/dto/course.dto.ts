import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString, IsDate, IsObject } from 'class-validator';
import { UserSignupDto } from '../../auth/dto/auth.dto';

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
export class EnrollManyDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  courseId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  userId: string;
}

@InputType()
export class GetAttendanceCodeDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  classId: string;

  @IsOptional()
  @Field()
  attendanceCode?: string;
}

export class HandleUploadRosterDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Field()
  joinCode: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Field()
  courseId: string;

  @IsNotEmpty()
  @Field(() => [UserSignupDto])
  studentList: UserSignupDto[];
}
