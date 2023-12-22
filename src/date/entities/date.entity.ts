import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Meal } from '../../meals/entities/meal.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MealUserDates } from './date-meal-user.entity';

@Entity()
@ObjectType()
export class DateEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'a unique identifier' })
  id: number;

  @Column()
  date: string;

  @ManyToMany(() => MealUserDates)
  meal_user_dates?: MealUserDates[];
}
