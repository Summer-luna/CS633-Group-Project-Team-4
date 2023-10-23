import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CourseModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  joinCode: number;

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
