import {
  Body,
  Controller,
  Headers,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('payments')
@Auth(AuthType.None)
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @Post('checkout')
  async checkout(@Body() checkoutDto: CheckoutDto) {
    return this.paymentService.checkout(checkoutDto);
  }

  @Post('webhook')
  async webhook(
    @Headers('stripe-signature') sig: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    return this.paymentService.handleWebhookRequest(req.rawBody, sig);
  }
}
