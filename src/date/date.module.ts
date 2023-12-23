import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateEntity } from './entities/date.entity';
import { Meal } from 'src/meals/entities/meal.entity';
import { DateService } from './date.service';
import { User } from 'src/users/entities/user.entity';
import { DateController } from './date.controller';
import { MealUserDates } from './entities/meal-user-date.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DateEntity, Meal, User, MealUserDates])],
  providers: [DateController, DateService],
  controllers: [DateController],
  exports: [DateService],
})
export class DateModule {}
