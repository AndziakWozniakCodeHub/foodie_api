import { InputType } from '@nestjs/graphql';
import { IsArray, IsNumber, IsString } from 'class-validator';

@InputType()
export class DateMealUserInput {
  @IsArray()
  meals: number[];

  @IsString()
  date: string;

  @IsNumber()
  user: number;

  @IsNumber()
  occurence: number;
}
