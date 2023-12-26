import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateEntity } from 'src/date/entities/date.entity';
import { DateMealUser } from 'src/date/entities/date-meal-user.entity';
import { User } from 'src/users/entities/user.entity';
import { DateTime } from 'luxon';
import { Meal } from 'src/meals/entities/meal.entity';
import { DateMealUserInput } from './dto/create-meal-date-user.input';

@Injectable()
export class DateService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealsRepository: Repository<Meal>,
    @InjectRepository(DateEntity)
    private readonly datesRepository: Repository<DateEntity>,
    @InjectRepository(DateMealUser)
    private readonly dateMealUserRepository: Repository<DateMealUser>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createMealsForUserInParticularDay(
    createMealUserDateInput: DateMealUserInput,
  ) {
    console.log(createMealUserDateInput);
    const meal = await this.mealsRepository.findOneBy({
      id: createMealUserDateInput.meal_id,
    });

    const user = await this.usersRepository.findOneBy({
      id: createMealUserDateInput.user_id,
    });

    const dateToJs = DateTime.fromFormat(
      createMealUserDateInput.date,
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
      occurence: createMealUserDateInput.occurence,
    };
    const dateMealUser = this.dateMealUserRepository.create(mealForUserInDay);
    return this.dateMealUserRepository.save(dateMealUser);
  }
}
