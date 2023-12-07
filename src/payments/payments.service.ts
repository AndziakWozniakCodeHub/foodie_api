import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE, {
      apiVersion: '2023-10-16',
    });
  }

  async createCustomer(email: string): Promise<void> {
    await this.stripe.customers.create({
      email,
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
}
