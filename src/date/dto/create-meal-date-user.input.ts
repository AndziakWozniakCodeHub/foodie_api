import { InputType } from '@nestjs/graphql';
import { IsNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class DateMealUserInput {
  @IsNumber()
  meal_id: number;

  @MinLength(3)
  @IsString()
  date: string;

  @IsNumber()
  user_id: number;

  @IsNumber()
  occurence: number;
}
