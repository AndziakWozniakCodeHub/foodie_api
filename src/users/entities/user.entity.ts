import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';
import { Payment } from 'src/payments/entities/payment.entity';
import { MealUserDates } from 'src/date/entities/meal-user-date.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'a unique identifier' })
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: Role, default: Role.Regular })
  @Field(() => Role)
  role: Role;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @ManyToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(
    () => MealUserDates,
    (mealUserDates: MealUserDates) => mealUserDates.dates,
  )
  userDates: MealUserDates[];

  @OneToMany(
    () => MealUserDates,
    (mealUserDates: MealUserDates) => mealUserDates.meals,
  )
  userMeals: MealUserDates[];
}
