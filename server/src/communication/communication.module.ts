import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationService } from './communication.service';
import { CommunicationController } from './communication.controller';
import { EmailConfig } from './entities/email-config.entity';
import { SmsConfig } from './entities/sms-config.entity';
import { CommunicationLog } from './entities/communication-log.entity';
import { PaymentNotification } from './entities/payment-notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmailConfig,
      SmsConfig,
      CommunicationLog,
      PaymentNotification,
    ]),
  ],
  controllers: [CommunicationController],
  providers: [CommunicationService],
  exports: [CommunicationService, TypeOrmModule],
})
export class CommunicationModule {}
