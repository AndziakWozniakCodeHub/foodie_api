import { InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateMealDateUserInput {
  @MinLength(1)
  date: string;

  // @MinLength(1)
  userId: number;

  // @MinLength(1)
  mealId: number;
}
