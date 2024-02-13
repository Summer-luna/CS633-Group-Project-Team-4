import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class AttendanceTypeCheckDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  classId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  userId: string;
}

@InputType()
export class AttendanceTypeInputDto extends AttendanceTypeCheckDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  attendanceCode: string;
}

@InputType()
export class AttendanceTypeEditDto extends AttendanceTypeInputDto {
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

  @IsOptional()
  @Field()
  attendanceCode?: string;
}

@InputType()
export class AttendanceTypeUpdateDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  attendanceType: number;
}

@InputType()
export class GetStudentAttendanceStateListDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  classId: string;

  @IsDate()
  @IsOptional()
  @Field()
  startDate?: Date;

  @IsDate()
  @Field()
  @IsOptional()
  endDate?: Date;
}
