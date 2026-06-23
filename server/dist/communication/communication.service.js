"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CommunicationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const email_config_entity_1 = require("./entities/email-config.entity");
const sms_config_entity_1 = require("./entities/sms-config.entity");
const communication_log_entity_1 = require("./entities/communication-log.entity");
const payment_notification_entity_1 = require("./entities/payment-notification.entity");
let CommunicationService = CommunicationService_1 = class CommunicationService {
    emailConfigRepo;
    smsConfigRepo;
    communicationLogRepo;
    paymentNotificationRepo;
    logger = new common_1.Logger(CommunicationService_1.name);
    constructor(emailConfigRepo, smsConfigRepo, communicationLogRepo, paymentNotificationRepo) {
        this.emailConfigRepo = emailConfigRepo;
        this.smsConfigRepo = smsConfigRepo;
        this.communicationLogRepo = communicationLogRepo;
        this.paymentNotificationRepo = paymentNotificationRepo;
    }
    async createEmailConfig(dto) {
        const config = this.emailConfigRepo.create(dto);
        return this.emailConfigRepo.save(config);
    }
    findEmailConfigs() {
        return this.emailConfigRepo.find();
    }
    findEmailConfig(id) {
        return this.emailConfigRepo.findOne({ where: { id } });
    }
    updateEmailConfig(id, dto) {
        return this.emailConfigRepo.update(id, dto);
    }
    removeEmailConfig(id) {
        return this.emailConfigRepo.delete(id);
    }
    async createSmsConfig(dto) {
        const config = this.smsConfigRepo.create(dto);
        return this.smsConfigRepo.save(config);
    }
    findSmsConfigs() {
        return this.smsConfigRepo.find();
    }
    findSmsConfig(id) {
        return this.smsConfigRepo.findOne({ where: { id } });
    }
    updateSmsConfig(id, dto) {
        return this.smsConfigRepo.update(id, dto);
    }
    removeSmsConfig(id) {
        return this.smsConfigRepo.delete(id);
    }
    async sendEmail(dto) {
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
        }
        catch (error) {
            await this.markCommunicationFailed(savedLog.id, error);
            throw error;
        }
    }
    async sendSms(dto) {
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
        }
        catch (error) {
            await this.markCommunicationFailed(savedLog.id, error);
            throw error;
        }
    }
    async createPaymentNotification(payment, customer, channel, eventType) {
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
    async createCustomerNotification(customer, channel, eventType) {
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
    async createEmployeeNotification(employee, channel, eventType) {
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
    async notifyPasswordChanged(email, channel = 'email') {
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
    async notifyCustomerCreated(customer, channel = 'email') {
        const sendDto = {
            eventType: 'customer-created',
            recipient: channel === 'sms' ? customer.phone : customer.email,
            subject: channel === 'sms' ? undefined : 'Welcome to our service',
            body: `Hello ${customer.name}, your customer account has been created successfully.`,
            payload: { customer },
            relatedTable: 'customer',
            relatedId: customer.customerid,
        };
        return channel === 'sms' ? this.sendSms(sendDto) : this.sendEmail(sendDto);
    }
    async notifyEmployeeCreated(employee, channel = 'email') {
        const sendDto = {
            eventType: 'employee-created',
            recipient: channel === 'sms' ? employee.phone : employee.email,
            subject: channel === 'sms' ? undefined : 'Welcome onboard',
            body: `Hello ${employee.name}, your employee account has been created successfully.`,
            payload: { employee },
            relatedTable: 'employee',
            relatedId: employee.employeeid,
        };
        return channel === 'sms' ? this.sendSms(sendDto) : this.sendEmail(sendDto);
    }
    async notifyPayment(customer, payment, channel = 'email') {
        const sendDto = {
            eventType: 'payment-created',
            recipient: channel === 'sms' ? customer.phone : customer.email,
            subject: channel === 'sms' ? undefined : `Payment received: ${payment.invoiceNumber}`,
            body: `Payment of ${payment.amount} for invoice ${payment.invoiceNumber} was created successfully.`,
            payload: { payment, customer },
            relatedTable: 'payment',
            relatedId: payment.id,
        };
        return channel === 'sms' ? this.sendSms(sendDto) : this.sendEmail(sendDto);
    }
    async markCommunicationSent(id, status) {
        await this.communicationLogRepo.update(id, {
            status,
            errorMessage: undefined,
        });
    }
    async markCommunicationFailed(id, error) {
        await this.communicationLogRepo.update(id, {
            status: 'failed',
            errorMessage: error.message,
        });
    }
};
exports.CommunicationService = CommunicationService;
exports.CommunicationService = CommunicationService = CommunicationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(email_config_entity_1.EmailConfig)),
    __param(1, (0, typeorm_1.InjectRepository)(sms_config_entity_1.SmsConfig)),
    __param(2, (0, typeorm_1.InjectRepository)(communication_log_entity_1.CommunicationLog)),
    __param(3, (0, typeorm_1.InjectRepository)(payment_notification_entity_1.PaymentNotification)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommunicationService);
//# sourceMappingURL=communication.service.js.map