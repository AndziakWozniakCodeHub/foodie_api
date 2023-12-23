import { ObjectType, Field, ID } from '@nestjs/graphql';
import { DateEntity } from 'src/date/entities/date.entity';
import { MealUserDates } from 'src/date/entities/meal-user-date.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
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

  @ManyToMany(() => User)
  users: User[];

  @ManyToMany(() => DateEntity, (dates) => dates.date)
  @JoinTable({
    name: 'meal_dates',
    joinColumn: {
      name: 'meal_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'date_id',
      referencedColumnName: 'id',
    },
  })
  dates?: DateEntity[];

  @OneToMany(
    () => MealUserDates,
    (mealUserDates: MealUserDates) => mealUserDates.dates,
  )
  mealDates: MealUserDates[];

  @OneToMany(
    () => MealUserDates,
    (mealUserDates: MealUserDates) => mealUserDates.users,
  )
  mealUsers: MealUserDates[];
}
