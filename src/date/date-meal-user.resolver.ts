import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { DateMealUserService } from './date-meal-user.service';
import { DateMealUserInput } from './dto/create-meal-date-user.input';
import { DateMealUser } from './entities/date-meal-user.entity';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => DateMealUser)
@Auth(AuthType.None)
export class DateMealUserResolver {
  constructor(private readonly dateService: DateMealUserService) {}

  @Mutation(() => DateMealUser)
  async createDateMealUser(
    @Args('createDateMealUserInput') createDateMealUser: DateMealUserInput,
  ) {
    return this.dateService.createMealsForUserInParticularDay(
      createDateMealUser,
    );
  }

  @Query(() => [DateMealUser], { name: 'mealsInDays' })
  async getDateMealUsersForUserAndDay(
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return this.dateService.getDateMealUsersForUserAndDay(userId);
  }
}
