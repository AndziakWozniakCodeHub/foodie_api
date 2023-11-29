import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { Auth } from '../iam/authentication/decorators/auth.decorator';
import { AuthType } from '../iam/authentication/enums/auth-type.enum';
import { EmailDto } from './dto/email.dto';

@Auth(AuthType.None)
@Controller('mailing')
export class MailingController {
  constructor(private readonly mailerService: MailingService) {}

  @HttpCode(HttpStatus.OK)
  @Post('test')
  async sendEmail() {
    await this.mailerService.sendMailWelcomeEmailConfirmation(
      'testowy-uzytkowniku',
      'kamil.andziakk97@gmail.com',
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async sendEmailRestartPassword(@Body() email: EmailDto) {
    await this.mailerService.sendEmailPasswordReset(email.email);
  }
}
