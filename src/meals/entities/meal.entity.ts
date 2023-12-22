import { ObjectType, Field, ID } from '@nestjs/graphql';
import { MealUserDates } from 'src/date/entities/date-meal-user.entity';
import { DateEntity } from 'src/date/entities/date.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Meal {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'a unique identifier' })
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  imageSource: string;

  @ManyToMany(
    () => MealUserDates,
    (mealUserDates: MealUserDates) => mealUserDates.dates,
  )
  meal_user_dates: MealUserDates[];
}
