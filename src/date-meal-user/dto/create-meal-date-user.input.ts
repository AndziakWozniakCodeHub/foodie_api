import { InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class DateMealUserInput {
  @IsNumber()
  meal: number;

  @IsString()
  date: string;

  @IsNumber()
  user: number;

  @IsNumber()
  occurence: number;
}
