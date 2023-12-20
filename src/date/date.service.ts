import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from 'src/meals/entities/meal.entity';
import { Repository } from 'typeorm';
import { DateEntity } from './entities/date.entity';
import { CreateMealDateUserInput } from './dto/create-meal-date-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DateService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
    @InjectRepository(DateEntity)
    private readonly dateRepository: Repository<DateEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createMealDateUserInput: CreateMealDateUserInput) {
    const dateEntity = await this.dateRepository.findOneOrFail({
      where: { date: createMealDateUserInput.date },
    });

    const mealEntity = await this.mealRepository.findOneOrFail({
      where: { id: createMealDateUserInput.mealId },
    });

    const userEntity = await this.userRepository.findOneOrFail({
      where: { id: createMealDateUserInput.userId },
    });

    if (!dateEntity.meals) {
      const newDateEntity = {
        ...dateEntity,
        user: [userEntity],
        meals: [mealEntity],
      };
      return this.dateRepository.save(newDateEntity);
    }

    const meals = [...dateEntity.meals, mealEntity];

    const newDateEntity = {
      ...dateEntity,
      user: [userEntity],
      meals,
    };
    return this.dateRepository.save(newDateEntity);
  }
}
