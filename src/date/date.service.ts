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

  async findNotPaidDays(userId: number) {
    const user = await this.usersRepository.findOneBy({
      id: userId,
    });
    const dateMealsForUser = await this.dateMealUserRepository.find({
      where: {
        user,
        paid: null,
      },
      relations: ['date', 'meal'],
    });

    if (!dateMealsForUser) {
      throw new BadRequestException(
        `dateMeals were not found for userId: ${userId}`,
      );
    }

    const reducedMealsInDaysForUser = dateMealsForUser.reduce(
      (accumulator, currentItem) => {
        const existingItem = accumulator.find((item) => {
          if (!item.date || !item.date.id) {
            return false;
          }
          return item.date.id === currentItem.date.id;
        });

        if (existingItem) {
          existingItem.meals.push(currentItem.meal);
        } else {
          accumulator.push({
            date: currentItem.date,
            meals: [currentItem.meal],
          });
        }

        return accumulator;
      },
      [],
    );

    return reducedMealsInDaysForUser;
  }
}
