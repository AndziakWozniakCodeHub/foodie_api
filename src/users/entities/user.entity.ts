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
import { DateMealUser } from 'src/date/entities/date-meal-user.entity';

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
    () => DateMealUser,
    (mealUserDates: DateMealUser) => mealUserDates.dates,
  )
  userDates: DateMealUser[];

  @OneToMany(
    () => DateMealUser,
    (mealUserDates: DateMealUser) => mealUserDates.meals,
  )
  userMeals: DateMealUser[];
}
