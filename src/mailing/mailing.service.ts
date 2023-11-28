import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import mailingConfig from './config/mailing.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MailingService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(mailingConfig.KEY)
    private readonly mailingConfiguration: ConfigType<typeof mailingConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async sendMailWelcomeEmailConfirmation(username: string, email: string) {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.mailingConfiguration.jwt.secret,
      expiresIn: this.mailingConfiguration.jwt.expiresIn,
    });

    const confirmation_url = `${this.mailingConfiguration.frontendURL}auth/confirm?token=${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Foodie! Confirm your Email',
      template: './welcome',
      context: {
        name: username,
        confirmation_url,
      },
    });
  }

  async reSendEmailConfirmation(email: string) {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.mailingConfiguration.jwt.secret,
      expiresIn: this.mailingConfiguration.jwt.expiresIn,
    });

    const confirmation_url = `${this.mailingConfiguration.frontendURL}auth/confirm?token=${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your Requested Confirmation Link for Foodie',
      template: './resendConfirmation',
      context: {
        confirmation_url,
      },
    });
  }
}
