import { InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class DateMealUserInput {
  @IsNumber()
  meal_id: number;

  @IsString()
  date: string;

  @IsNumber()
  user_id: number;

  @IsNumber()
  occurence: number;
}
