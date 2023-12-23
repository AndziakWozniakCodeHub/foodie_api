import { Body, Controller, Post } from '@nestjs/common';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { DateService } from './date.service';
import { DateMealUserInput } from './dto/create-meal-date-user.dto';

@Controller()
@Auth(AuthType.None)
export class DateController {
  constructor(private readonly dateService: DateService) {}

  @Post('insertMealsForUserInDate')
  async insertMealForUserInDate(
    @Body() insertMealForUserInDate: DateMealUserInput,
  ) {
    return this.dateService.createMealsForUserInParticularDay(
      insertMealForUserInDate,
    );
  }
}
