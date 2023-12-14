import { IsEmail } from 'class-validator';

export class CheckoutDto {
  @IsEmail()
  email: string;
}
