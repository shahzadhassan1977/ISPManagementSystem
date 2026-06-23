import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailConfig } from './entities/email-config.entity';
import { SmsConfig } from './entities/sms-config.entity';
import { CommunicationLog } from './entities/communication-log.entity';
import { PaymentNotification } from './entities/payment-notification.entity';
import { CreateEmailConfigDto } from './dto/create-email-config.dto';
import { UpdateEmailConfigDto } from './dto/update-email-config.dto';
import { CreateSmsConfigDto } from './dto/create-sms-config.dto';
import { UpdateSmsConfigDto } from './dto/update-sms-config.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { SendSmsDto } from './dto/send-sms.dto';
import { Customer } from '../customer/entities/customer.entity';
import { Payment } from '../payment/entities/payment.entity';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class CommunicationService {
  private readonly logger = new Logger(CommunicationService.name);

  constructor(
    @InjectRepository(EmailConfig)
    private emailConfigRepo: Repository<EmailConfig>,
    @InjectRepository(SmsConfig)
    private smsConfigRepo: Repository<SmsConfig>,
    @InjectRepository(CommunicationLog)
    private communicationLogRepo: Repository<CommunicationLog>,
    @InjectRepository(PaymentNotification)
    private paymentNotificationRepo: Repository<PaymentNotification>,
  ) {}

  async createEmailConfig(dto: CreateEmailConfigDto) {
    const config = this.emailConfigRepo.create(dto);
    return this.emailConfigRepo.save(config);
  }

  findEmailConfigs() {
    return this.emailConfigRepo.find();
  }

  findEmailConfig(id: number) {
    return this.emailConfigRepo.findOne({ where: { id } });
  }

  updateEmailConfig(id: number, dto: UpdateEmailConfigDto) {
    return this.emailConfigRepo.update(id, dto);
  }

  removeEmailConfig(id: number) {
    return this.emailConfigRepo.delete(id);
  }

  async createSmsConfig(dto: CreateSmsConfigDto) {
    const config = this.smsConfigRepo.create(dto);
    return this.smsConfigRepo.save(config);
  }

  findSmsConfigs() {
    return this.smsConfigRepo.find();
  }

  findSmsConfig(id: number) {
    return this.smsConfigRepo.findOne({ where: { id } });
  }

  updateSmsConfig(id: number, dto: UpdateSmsConfigDto) {
    return this.smsConfigRepo.update(id, dto);
  }

  removeSmsConfig(id: number) {
    return this.smsConfigRepo.delete(id);
  }

  async sendEmail(dto: SendEmailDto) {
    const log = this.communicationLogRepo.create({
      channel: 'email',
      eventType: dto.eventType,
      recipient: dto.recipient,
      subject: dto.subject,
      body: dto.body,
      status: 'pending',
      payload: dto.payload,
      relatedTable: dto.relatedTable,
      relatedId: dto.relatedId,
    });
    const savedLog = await this.communicationLogRepo.save(log);

    try {
      this.logger.log(`Sending email to ${dto.recipient}, event ${dto.eventType}`);
      await this.markCommunicationSent(savedLog.id, 'sent');
      return savedLog;
    } catch (error) {
      await this.markCommunicationFailed(savedLog.id, error as Error);
      throw error;
    }
  }

  async sendSms(dto: SendSmsDto) {
    const log = this.communicationLogRepo.create({
      channel: 'sms',
      eventType: dto.eventType,
      recipient: dto.recipient,
      body: dto.body,
      status: 'pending',
      payload: dto.payload,
      relatedTable: dto.relatedTable,
      relatedId: dto.relatedId,
    });
    const savedLog = await this.communicationLogRepo.save(log);

    try {
      this.logger.log(`Sending sms to ${dto.recipient}, event ${dto.eventType}`);
      await this.markCommunicationSent(savedLog.id, 'sent');
      return savedLog;
    } catch (error) {
      await this.markCommunicationFailed(savedLog.id, error as Error);
      throw error;
    }
  }

  async createPaymentNotification(payment: Payment, customer: Customer, channel: string, eventType: string) {
    const notification = this.paymentNotificationRepo.create({
      paymentId: payment.id,
      customerId: customer.customerid,
      channel,
      eventType,
      recipient: customer.email,
      subject: `Payment ${eventType}`,
      body: `Payment of ${payment.amount} for invoice ${payment.invoiceNumber}`,
      status: 'pending',
      isSent: false,
      payload: {
        payment,
        customer,
      },
    });

    return this.paymentNotificationRepo.save(notification);
  }

  async createCustomerNotification(customer: Customer, channel: string, eventType: string) {
    const notification = this.paymentNotificationRepo.create({
      paymentId: 0,
      customerId: customer.customerid,
      channel,
      eventType,
      recipient: channel === 'sms' ? customer.phone : customer.email,
      subject: `Customer ${eventType}`,
      body: `Customer ${customer.name} was created or updated`,
      status: 'pending',
      isSent: false,
      payload: { customer },
    });

    return this.paymentNotificationRepo.save(notification);
  }

  async createEmployeeNotification(employee: Employee, channel: string, eventType: string) {
    const notification = this.paymentNotificationRepo.create({
      paymentId: 0,
      customerId: 0,
      channel,
      eventType,
      recipient: channel === 'sms' ? employee.phone : employee.email,
      subject: `Employee ${eventType}`,
      body: `Employee ${employee.name} was created or updated`,
      status: 'pending',
      isSent: false,
      payload: { employee },
    });

    return this.paymentNotificationRepo.save(notification);
  }

  async notifyPasswordChanged(email: string, channel = 'email') {
    if (channel === 'sms') {
      return this.sendSms({
        eventType: 'password-changed',
        recipient: email,
        body: 'Your password has been updated successfully.',
      });
    }

    return this.sendEmail({
      eventType: 'password-changed',
      recipient: email,
      subject: 'Password Changed',
      body: 'Your password has been updated successfully.',
    });
  }

  async notifyCustomerCreated(customer: Customer, channel = 'email') {
    const sendDto = {
      eventType: 'customer-created',
      recipient: channel === 'sms' ? customer.phone : customer.email,
      subject: channel === 'sms' ? undefined : 'Welcome to our service',
      body: `Hello ${customer.name}, your customer account has been created successfully.`,
      payload: { customer },
      relatedTable: 'customer',
      relatedId: customer.customerid,
    };

    return channel === 'sms' ? this.sendSms(sendDto as any) : this.sendEmail(sendDto as any);
  }

  async notifyEmployeeCreated(employee: Employee, channel = 'email') {
    const sendDto = {
      eventType: 'employee-created',
      recipient: channel === 'sms' ? employee.phone : employee.email,
      subject: channel === 'sms' ? undefined : 'Welcome onboard',
      body: `Hello ${employee.name}, your employee account has been created successfully.`,
      payload: { employee },
      relatedTable: 'employee',
      relatedId: employee.employeeid,
    };

    return channel === 'sms' ? this.sendSms(sendDto as any) : this.sendEmail(sendDto as any);
  }

  async notifyPayment(customer: Customer, payment: Payment, channel = 'email') {
    const sendDto = {
      eventType: 'payment-created',
      recipient: channel === 'sms' ? customer.phone : customer.email,
      subject: channel === 'sms' ? undefined : `Payment received: ${payment.invoiceNumber}`,
      body: `Payment of ${payment.amount} for invoice ${payment.invoiceNumber} was created successfully.`,
      payload: { payment, customer },
      relatedTable: 'payment',
      relatedId: payment.id,
    };

    return channel === 'sms' ? this.sendSms(sendDto as any) : this.sendEmail(sendDto as any);
  }

  private async markCommunicationSent(id: number, status: string) {
    await this.communicationLogRepo.update(id, {
      status,
      errorMessage: undefined,
    });
  }

  private async markCommunicationFailed(id: number, error: Error) {
    await this.communicationLogRepo.update(id, {
      status: 'failed',
      errorMessage: error.message,
    });
  }
}
