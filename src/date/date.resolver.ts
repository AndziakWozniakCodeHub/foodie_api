import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { CreateMealDateUserInput } from './dto/create-meal-date-user.dto';
import { DateService } from './date.service';

@Controller('date')
@Auth(AuthType.None)
export class DateResolver {
  constructor(private dateService: DateService) {}

  @Post('createMealDateUser')
  async checkout(@Body() createMealDateUserInput: CreateMealDateUserInput) {
    return this.dateService.create(createMealDateUserInput);
  }
}
