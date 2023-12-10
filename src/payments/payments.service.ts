import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CheckoutDto } from './dto/checkout.dto';
import { SignUpDto } from 'src/iam/authentication/dto/sign-up.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;
  private configService: ConfigService;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE, {
      apiVersion: '2023-10-16',
    });
    this.configService = new ConfigService();
  }

  async createCustomer(signUpDto: SignUpDto): Promise<void> {
    await this.stripe.customers.create({
      email: signUpDto.email,
      name: signUpDto.username,
    });
  }

  async checkout(checkoutDto: CheckoutDto): Promise<string> {
    const session = await this.stripe.checkout.sessions.create({
      cancel_url: 'http://localhost:3000/api/docs',
      customer_email: checkoutDto.email,
      line_items: [
        {
          price: 'price_1OKnIUF6uGp5IIZlNb4BVNGz',
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_method_types: ['blik', 'card', 'p24'],
      success_url: 'http://localhost:3000/api/docs',
    });
    return session.url;
  }

  async handleWebhookRequest(body: any, signature: any): Promise<any> {
    const secretEndpoint = this.configService.get('STRIPE_WEBHOOK');
    console.log(secretEndpoint);

    const event = this.stripe.webhooks.constructEvent(
      body,
      signature,
      secretEndpoint,
    );

    console.log(event);
  }
}
