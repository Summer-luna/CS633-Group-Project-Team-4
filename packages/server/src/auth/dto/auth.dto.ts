import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UserSignupDto {
  @IsDefined()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;

  @IsString()
  @Field()
  lastName: string;

  @IsString()
  @Field()
  firstName: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  buID: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  role: number;
}

@InputType()
export class UserLogInDto {
  @IsDefined()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;
}
