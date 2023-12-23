import { ApiProperty } from '@nestjs/swagger';

export class DateMealUserInput {
  @ApiProperty()
  meal_id: number;
  @ApiProperty()
  date: string;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  occurence: number;
}
