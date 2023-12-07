import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { CheckoutDto } from './dto/checkout.dto';
import { GetSummaryPayments } from './dto/getSummaryPayments.dto';

@Controller('payments')
@Auth(AuthType.None)
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @Post('checkout')
  async checkout(@Body() checkoutDto: CheckoutDto) {
    return this.paymentService.checkout(checkoutDto);
  }

  @Post('getSummaryPayments')
  async getSummaryPayments(@Body() getSummaryPayments: GetSummaryPayments) {
    return this.paymentService.getSummaryPayments(getSummaryPayments);
  }
}
