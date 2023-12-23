import { Body, Controller, Post } from '@nestjs/common';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { DateService } from './date.service';
import { InsertMealForUserInDateDto } from 'src/meals/dto/create-meal-user-date.input';

@Controller()
@Auth(AuthType.None)
export class DateController {
  constructor(private readonly dateService: DateService) {}

  @Post('insertMealsForUserInDate')
  async insertMealForUserInDate(
    @Body() insertMealForUserInDate: InsertMealForUserInDateDto,
  ) {
    return this.dateService.createMealsForUserInParticularDay(
      insertMealForUserInDate,
    );
  }
}
