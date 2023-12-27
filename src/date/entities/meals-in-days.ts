import { ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { DateEntity } from './date.entity';
import { Meal } from 'src/meals/entities/meal.entity';

@Entity()
@ObjectType()
export class MealsInDays {
  @Column()
  date: DateEntity[];

  @Column()
  meals: Meal[];
}
