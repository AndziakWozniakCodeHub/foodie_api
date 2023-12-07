import { IsEmail } from 'class-validator';

export class GetSummaryPayments {
  @IsEmail()
  email: string;
}
