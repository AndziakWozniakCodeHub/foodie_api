import { InputType } from '@nestjs/graphql';
import { IsNumber, MinLength } from 'class-validator';

@InputType()
export class CreateMealInput {
  @MinLength(3)
  name: string;

  @IsNumber()
  price: number;

  @MinLength(3)
  type: string;
}
