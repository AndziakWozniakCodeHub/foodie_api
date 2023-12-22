import {
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { DateEntity } from './date.entity';
import { Meal } from 'src/meals/entities/meal.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('meal_user_dates')
export class MealUserDates {
  @PrimaryColumn({ name: 'meal_id' })
  meal_id: number;

  @PrimaryColumn({ name: 'date_id' })
  date_id: number;

  @PrimaryColumn({ name: 'user_id ' })
  user_id: number;

  @ManyToMany(() => Meal, (meal) => meal.id)
  @JoinColumn([{ name: 'meal_id', referencedColumnName: 'id' }])
  meals: Meal[];

  @ManyToMany(() => DateEntity, (dates) => dates.id)
  @JoinColumn([{ name: 'date_id', referencedColumnName: 'id' }])
  dates: DateEntity[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: User[];
}
