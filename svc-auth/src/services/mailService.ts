import { Transporter, SendMailOptions, createTransport } from 'nodemailer';
import { getLogger } from '@src/libs/logger';

class MailService {
  private logger = getLogger('MailService');
  private transporter: Transporter;

  constructor () {
    this.logger.info('Create mail transport...');
    this.transporter = createTransport({
      host: 'mail',
      port: 25,
      secure: false,
    });
  }

  public send (mail: SendMailOptions): Promise<any> {
    this.logger.info('Gonna send email', mail);
    return this.transporter.sendMail(mail);
  }
}

export const mailService = new MailService();
