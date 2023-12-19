import { ObjectType, Field, ID } from '@nestjs/graphql';
import { DateEntity } from 'src/dates/entities/date.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => DateEntity, (date) => date.meals)
  @JoinTable()
  dates: DateEntity[];
}
