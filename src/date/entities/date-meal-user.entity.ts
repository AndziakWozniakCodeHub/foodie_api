// import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
// import { DateEntity } from './date.entity';
// import { Meal } from 'src/meals/entities/meal.entity';
// import { User } from 'src/users/entities/user.entity';
// import { ObjectType } from '@nestjs/graphql';

// @Entity()
// @ObjectType()
// export class DateMealUser {
//   @PrimaryColumn({ name: 'meal_id' })
//   meal_id: number;

//   @PrimaryColumn({ name: 'date_id' })
//   date_id: number;

//   @PrimaryColumn({ name: 'user_id' })
//   user_id: number;

//   @ManyToOne(() => Meal, (meal) => meal.dates)
//   @JoinColumn([{ name: 'meal_id', referencedColumnName: 'id' }])
//   meals: Meal[];

//   @ManyToOne(() => DateEntity, (dates) => dates.meals)
//   @JoinColumn([{ name: 'date_id', referencedColumnName: 'id' }])
//   dates: DateEntity[];

//   @ManyToOne(() => User, (user) => user.id)
//   @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
//   users: User[];
// }

// // export class DateMealUser {
// //   @PrimaryColumn({ name: 'meal_id' })
// //   meal_id: number;

// //   @PrimaryColumn({ name: 'date_id' })
// //   date_id: number;

// //   @PrimaryColumn({ name: 'user_id' })
// //   user_id: number;

// //   @ManyToMany(() => Meal, (meal) => meal.id)
// //   @JoinColumn([{ name: 'meal_id', referencedColumnName: 'id' }])
// //   meals: Meal[];

// //   @ManyToMany(() => DateEntity, (dates) => dates.id)
// //   @JoinColumn([{ name: 'date_id', referencedColumnName: 'id' }])
// //   dates: DateEntity[];

// //   @ManyToOne(() => User, (user) => user.id)
// //   @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
// //   users: User[];
// // }
