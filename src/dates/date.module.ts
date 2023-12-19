import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateEntity } from './entities/date.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DateEntity])],
  providers: [],
})
export class DateModule {}
