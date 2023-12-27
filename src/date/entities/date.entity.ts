import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DateMealUser } from './date-meal-user.entity';

@Entity()
@ObjectType()
export class DateEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'a unique identifier' })
  id: number;

  @Column()
  date: Date;

  @ManyToMany(() => DateMealUser, (dateMealUser) => dateMealUser.dates)
  @JoinTable({ name: 'dates_in_date_meal_user' })
  dateMealUsers: DateMealUser[];
}
