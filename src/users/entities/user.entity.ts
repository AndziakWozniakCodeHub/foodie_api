import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';
import { Payment } from 'src/payments/entities/payment.entity';
import { DateEntity } from 'src/dates/entities/date.entity';

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

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @ManyToMany(() => DateEntity, (date) => date.users)
  @JoinTable()
  dates: DateEntity[];
}
