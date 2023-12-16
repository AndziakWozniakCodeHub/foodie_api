import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNumber, MinLength } from 'class-validator';

@InputType()
export class CreatePaymentInput {
  @MinLength(3)
  stripe_id: string;

  @MinLength(3)
  created_at: number;

  @IsEmail()
  customer_email: string;

  @MinLength(3)
  type: string;

  @IsNumber()
  price: number;
}
