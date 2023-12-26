import { Meal } from 'src/meals/entities/meal.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
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

  @Column({ name: 'meal_id' })
  meal_id: number;

  @Column({ name: 'date_id' })
  date_id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Meal, (meal) => meal.id)
  meals: Meal[];

  @ManyToMany(() => DateEntity, (dateEntity) => dateEntity.dateMealUsers)
  @JoinTable({
    name: 'dates',
  })
  dates: DateEntity[];

  @ManyToOne(() => User, (user) => user.id)
  users: User[];

  @Column()
  occurence: number;
}
