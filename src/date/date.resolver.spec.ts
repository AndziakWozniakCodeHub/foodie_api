import { Test, TestingModule } from '@nestjs/testing';
import { DateResolver } from './date.resolver';

describe('DateController', () => {
  let controller: DateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DateResolver],
    }).compile();

    controller = module.get<DateResolver>(DateResolver);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
