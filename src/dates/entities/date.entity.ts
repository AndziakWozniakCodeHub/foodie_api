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

@Entity()
@ObjectType()
export class DateEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'a unique identifier' })
  id: number;

  @Column()
  date: string;

  @ManyToMany(() => User, (user) => user.dates)
  users: User[];

  @ManyToMany(() => Meal, (meal) => meal.dates)
  @JoinTable()
  meals: Meal[];
}
