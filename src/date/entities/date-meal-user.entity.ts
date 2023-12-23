import { Meal } from 'src/meals/entities/meal.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateEntity } from './date.entity';
import { User } from 'src/users/entities/user.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class DateMealUser {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'a unique identifier' })
  id: number;

  @PrimaryColumn({ name: 'meal_id' })
  meal_id: number;

  @PrimaryColumn({ name: 'date_id' })
  date_id: number;

  @PrimaryColumn({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Meal, (meal) => meal.dates)
  @JoinColumn([{ name: 'meal_id', referencedColumnName: 'id' }])
  meals: Meal[];

  @ManyToMany(() => DateEntity, (dates) => dates.meals)
  @JoinColumn([{ name: 'date_id', referencedColumnName: 'id' }])
  dates: DateEntity[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: User[];

  @Column()
  occurence: number;
}
