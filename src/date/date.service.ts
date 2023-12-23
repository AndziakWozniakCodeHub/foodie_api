import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateEntity } from 'src/date/entities/date.entity';
import { MealUserDates } from 'src/date/entities/meal-user-date.entity';
import { User } from 'src/users/entities/user.entity';
import { DateTime } from 'luxon';
import { Meal } from 'src/meals/entities/meal.entity';
import { InsertMealForUserInDateDto } from 'src/meals/dto/create-meal-user-date.input';

@Injectable()
export class DateService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealsRepository: Repository<Meal>,
    @InjectRepository(DateEntity)
    private readonly datesRepository: Repository<DateEntity>,
    @InjectRepository(MealUserDates)
    private readonly mealUserDatesRepository: Repository<MealUserDates>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createMealsForUserInParticularDay(
    insertMealForUserInDateDto: InsertMealForUserInDateDto,
  ): Promise<void> {
    const meal = await this.mealsRepository.findOneBy({
      id: insertMealForUserInDateDto.meal_id,
    });

    const user = await this.usersRepository.findOneBy({
      id: insertMealForUserInDateDto.user_id,
    });

    const dateToJs = DateTime.fromFormat(
      insertMealForUserInDateDto.date,
      'yyyy-MM-dd',
    ).toJSDate();

    const [dateFromDatabase] = await this.datesRepository.find({
      where: { date: dateToJs },
    });

    if (!dateFromDatabase || !meal || !user) {
      throw new BadRequestException('No meal / user / date found');
    }

    const mealForUserInDay = {
      meal_id: meal.id,
      date_id: dateFromDatabase.id,
      user_id: user.id,
    };

    await this.mealUserDatesRepository.save(mealForUserInDay);
  }
}
