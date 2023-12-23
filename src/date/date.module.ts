import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateEntity } from './entities/date.entity';
import { Meal } from 'src/meals/entities/meal.entity';
import { DateService } from './date.service';
import { User } from 'src/users/entities/user.entity';
import { DateResolver } from './date.resolver';
import { DateMealUser } from './entities/date-meal-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DateEntity, Meal, User, DateMealUser])],
  providers: [DateResolver, DateService],
})
export class DateModule {}
