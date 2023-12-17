import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsResolver } from './payments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentsResolver],
  providers: [PaymentsService, PaymentsResolver],
  exports: [PaymentsService, TypeOrmModule.forFeature([Payment])],
})
export class PaymentsModule {}
