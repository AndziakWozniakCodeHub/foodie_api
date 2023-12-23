import { Post } from '@nestjs/common';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { DateService } from './date.service';
import { DateMealUserInput } from './dto/create-meal-date-user.dto';
import { DateMealUser } from './entities/date-meal-user.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver(() => DateMealUser)
@Auth(AuthType.None)
export class DateResolver {
  constructor(private readonly dateService: DateService) {}

  // @Post('insertMealsForUserInDate')
  @Mutation(() => DateMealUser)
  async insertMealForUserInDate(
    @Args('createDateMealUser') createDateMealUser: DateMealUserInput,
  ) {
    return this.dateService.createMealsForUserInParticularDay(
      createDateMealUser,
    );
  }
}
