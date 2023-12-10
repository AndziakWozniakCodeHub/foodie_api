import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CheckoutDto } from './dto/checkout.dto';
import { SignUpDto } from 'src/iam/authentication/dto/sign-up.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentInput } from './dto/create-payment.input';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;
  private configService: ConfigService;
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {
    this.configService = new ConfigService();
    this.stripe = new Stripe(this.configService.get('STRIPE_TEST'), {
      apiVersion: '2023-10-16',
    });
  }

  async createCustomer(signUpDto: SignUpDto): Promise<void> {
    await this.stripe.customers.create({
      email: signUpDto.email,
      name: signUpDto.username,
    });
  }

  async checkout(checkoutDto: CheckoutDto): Promise<string> {
    const session = await this.stripe.checkout.sessions.create({
      cancel_url: 'https://innovativy.con/',
      customer_email: checkoutDto.email,
      line_items: [
        {
          price: 'price_1OKnIUF6uGp5IIZlNb4BVNGz',
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_method_types: ['blik', 'card', 'p24'],
      success_url: 'https://innovativy.com/',
    });
    return session.url;
  }

  async handleWebhookRequest(body: any, signature: any): Promise<any> {
    const secretEndpoint = this.configService.get('STRIPE_WEBHOOK_TEST');
    const event = this.stripe.webhooks.constructEvent(
      body,
      signature,
      secretEndpoint,
    );
    console.log(event);
    switch (event.type) {
      case 'checkout.session.completed':
        const createPaymentInput = {
          stripe_id: event.id,
          created_at: event.created,
          customer_email: event.data.object.customer_email,
          type: event.type,
          price: event.data.object.amount_total,
        };
        await this.savePayment(createPaymentInput);
        break;
      default:
        console.log(`Sorry, we are out of event types.`);
    }
  }

  savePayment(createPaymentInput: CreatePaymentInput) {
    const payment = this.paymentRepository.create(createPaymentInput);
    return this.paymentRepository.save(payment);
  }
}
