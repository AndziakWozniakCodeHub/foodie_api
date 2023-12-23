import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateEntity } from './entities/date.entity';
import { Meal } from 'src/meals/entities/meal.entity';
import { DateService } from './date.service';
import { User } from 'src/users/entities/user.entity';
import { DateController } from './date.controller';
import { DateMealUser } from './entities/date-meal-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DateEntity, Meal, User, DateMealUser])],
  providers: [DateController, DateService],
  controllers: [DateController],
  exports: [DateService],
})
export class DateModule {}
