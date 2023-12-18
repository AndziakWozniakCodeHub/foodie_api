import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';
import { Payment } from 'src/payments/entities/payment.entity';

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
}
