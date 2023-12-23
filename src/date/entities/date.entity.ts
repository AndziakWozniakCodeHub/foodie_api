import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MealUserDates } from './meal-user-date.entity';
import { Meal } from 'src/meals/entities/meal.entity';

@Entity()
@ObjectType()
export class DateEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'a unique identifier' })
  id: number;

  @Column()
  date: Date;

  @ManyToMany(() => Meal, (meal) => meal.dates)
  meals?: Meal[];

  @ManyToMany(() => MealUserDates)
  mealUserDates?: MealUserDates[];
}
