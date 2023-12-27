import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { DateService } from './date.service';
import { DateMealUserInput } from './dto/create-meal-date-user.input';
import { DateMealUser } from './entities/date-meal-user.entity';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => DateMealUser)
@Auth(AuthType.None)
export class DateResolver {
  constructor(private readonly dateService: DateService) {}

  @Mutation(() => DateMealUser)
  async createDateMealUser(
    @Args('createDateMealUserInput') createDateMealUser: DateMealUserInput,
  ) {
    return this.dateService.createMealsForUserInParticularDay(
      createDateMealUser,
    );
  }

  @Query(() => DateMealUser, { name: 'mealsInDays' })
  findMealsInDays(@Args('userId', { type: () => ID }) id: number) {
    return this.dateService.findNotPaidDays(id);
  }
}
