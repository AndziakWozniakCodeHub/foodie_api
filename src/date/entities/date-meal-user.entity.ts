import { Meal } from 'src/meals/entities/meal.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @ManyToOne(() => Meal, (meal) => meal.dateMealUsers)
  meal: Meal;

  @ManyToMany(() => DateEntity, (dateEntity) => dateEntity.dateMealUsers)
  @JoinTable({
    name: 'dates_in_date_meal_user',
  })
  dates: DateEntity[];

  @ManyToOne(() => User, (user) => user.id)
  users: User[];

  @Column()
  occurence: number;
}
