import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CheckoutDto } from './dto/checkout.dto';
import { SignUpDto } from 'src/iam/authentication/dto/sign-up.dto';
import { GetSummaryPayments } from './dto/getSummaryPayments.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE, {
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

  async getSummaryPayments(
    getSummaryPayments: GetSummaryPayments,
  ): Promise<number> {
    const customers = await this.stripe.customers.list({
      email: getSummaryPayments.email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      throw new BadRequestException(
        `Customer email: ${getSummaryPayments.email} was not found in Stripe.`,
      );
    }

    const { data } = customers;

    const [{ id: customerId }] = data;

    // const charges = await this.stripe.charges.list({
    //   customer: customerId,
    // });

    // console.log(charges);

    // const sum = charges.data.reduce(
    //   (total, charge) => total + charge.amount,
    //   0,
    // );

    // const checkoutSessions = await this.stripe.checkout.sessions.list({
    //   customer: customerId,
    // });

    // console.log(checkoutSessions);

    // const sum = checkoutSessions.data.reduce((total, session) => {
    //   if (session.payment_status === 'paid') {
    //     total += session.amount_total || 0;
    //   }
    //   return total;
    // }, 0);

    // List payments for the customer
    const payments = await this.stripe.paymentIntents.list({
      customer: customerId,
    });

    console.log(payments);

    // Calculate the sum of payment amounts
    const sum = payments.data.reduce((total, payment) => {
      total += payment.amount_received || 0;
      return total;
    }, 0);

    return sum;
  }
}
