import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString, IsEmail } from 'class-validator';

// user input for updating their information
@InputType()
export class UpdateUserDto {
  @IsDefined()
  @IsString()
  @Field()
  id: string;

  @IsEmail()
  @Field()
  email: string;

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
