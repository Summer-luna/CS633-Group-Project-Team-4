import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CourseModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  joinCode: string;

  @Field()
  attendanceCode: string;

  @Field()
  description: string;

  @Field()
  location: string;

  @Field()
  semesterId: number;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;
}

@ObjectType()
export class UserOnCourseModel {
  @Field()
  userId: string;

  @Field()
  courseId: string;

  @Field()
  enrolled: Date;
}

@ObjectType()
export class AttendanceModel {
  @Field()
  id: string;

  @Field()
  attendanceType: number;

  @Field()
  created: Date;

  @Field()
  fullName: string;

  @Field()
  buID: string;

  @Field()
  userId: string;

  @Field()
  classId: string;
}
