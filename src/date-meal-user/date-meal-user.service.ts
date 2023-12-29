import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateEntity } from 'src/date-meal-user/entities/date.entity';
import { DateMealUser } from 'src/date-meal-user/entities/date-meal-user.entity';
import { User } from 'src/users/entities/user.entity';
import { DateTime } from 'luxon';
import { Meal } from 'src/meals/entities/meal.entity';
import { DateMealUserInput } from './dto/create-meal-date-user.input';

@Injectable()
export class DateMealUserService {
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
    const meal = await this.mealsRepository.findOneBy({
      id: createMealUserDateInput.meal,
    });

    const user = await this.usersRepository.findOneBy({
      id: createMealUserDateInput.user,
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
      occurence: createMealUserDateInput.occurence,
      date: dateFromDatabase,
      meal,
      user,
      paid: false,
    };
    const dateMealUser = this.dateMealUserRepository.create(mealForUserInDay);
    return this.dateMealUserRepository.save(dateMealUser);
  }

  async getDateMealUsersForUserAndDay(
    userEmail: string,
  ): Promise<DateMealUser[]> {
    return this.dateMealUserRepository.find({
      where: { user: { email: userEmail }, paid: false },
      relations: ['meal', 'date'],
    });
  }
}
