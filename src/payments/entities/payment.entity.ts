import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'a unique identifier' })
  id: number;

  @Column()
  stripe_id: string;

  @Column()
  created_at: number;

  @Column()
  customer_email: string;

  @Column()
  type: string;

  @Column()
  price: number;
}
