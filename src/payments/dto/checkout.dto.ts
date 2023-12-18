import { IsEmail, IsNumber } from 'class-validator';

export class CheckoutDto {
  @IsEmail()
  email: string;

  @IsNumber()
  value: number;
}
