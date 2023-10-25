import { Field, ObjectType } from '@nestjs/graphql';
import { CourseModel } from '../../course/model/course.model';

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  lastName: string;

  @Field()
  firstName: string;

  @Field()
  role: number;

  @Field()
  courses: CourseModel[];
}
