import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateEntity } from './entities/date.entity';
import { DateResolver } from './date.resolver';
import { Meal } from 'src/meals/entities/meal.entity';
import { DateService } from './date.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DateEntity, Meal, User])],
  providers: [DateResolver, DateService],
  controllers: [DateResolver],
  exports: [DateService],
})
export class DateModule {}
