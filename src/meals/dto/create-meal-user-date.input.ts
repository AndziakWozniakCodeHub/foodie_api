import { ApiProperty } from '@nestjs/swagger';

export class InsertMealForUserInDateDto {
  @ApiProperty()
  meal_id: number;
  @ApiProperty()
  date: string;
  @ApiProperty()
  user_id: number;
}
