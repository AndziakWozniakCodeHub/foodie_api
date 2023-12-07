import { InputType } from '@nestjs/graphql';
import { IsNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateMealInput {
  @IsNumber()
  price: number;

  @MinLength(3)
  type: string;

  @MinLength(3)
  title: string;

  @IsString()
  description: string;

  @IsString()
  imageSource: string;
}
