import { Controller, Post } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { Auth } from '../iam/authentication/decorators/auth.decorator';
import { AuthType } from '../iam/authentication/enums/auth-type.enum';

// TODO: TEST only - will be remove on production

@Auth(AuthType.None)
@Controller('mailing')
export class MailingController {
  constructor(private readonly mailerService: MailingService) {}

  @Post()
  async sendEmail() {
    await this.mailerService.sendMailWelcomeEmailConfirmation(
      'testowy-uzytkowniku',
      'kamil.andziakk97@gmail.com',
    );
  }
}
