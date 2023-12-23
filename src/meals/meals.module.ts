import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsResolver } from './meals.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { MealUserDates } from 'src/date/entities/meal-user-date.entity';
import { DateEntity } from 'src/date/entities/date.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, User, DateEntity, MealUserDates])],
  providers: [MealsResolver, MealsService],
})
export class MealsModule {}
