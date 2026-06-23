import { CommunicationService } from './communication.service';
import { CreateEmailConfigDto } from './dto/create-email-config.dto';
import { UpdateEmailConfigDto } from './dto/update-email-config.dto';
import { CreateSmsConfigDto } from './dto/create-sms-config.dto';
import { UpdateSmsConfigDto } from './dto/update-sms-config.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { SendSmsDto } from './dto/send-sms.dto';
export declare class CommunicationController {
    private readonly service;
    constructor(service: CommunicationService);
    createEmailConfig(dto: CreateEmailConfigDto): Promise<import("./entities/email-config.entity").EmailConfig>;
    findEmailConfigs(): Promise<import("./entities/email-config.entity").EmailConfig[]>;
    findEmailConfig(id: number): Promise<import("./entities/email-config.entity").EmailConfig | null>;
    updateEmailConfig(id: number, dto: UpdateEmailConfigDto): Promise<import("typeorm").UpdateResult>;
    removeEmailConfig(id: number): Promise<import("typeorm").DeleteResult>;
    createSmsConfig(dto: CreateSmsConfigDto): Promise<import("./entities/sms-config.entity").SmsConfig>;
    findSmsConfigs(): Promise<import("./entities/sms-config.entity").SmsConfig[]>;
    findSmsConfig(id: number): Promise<import("./entities/sms-config.entity").SmsConfig | null>;
    updateSmsConfig(id: number, dto: UpdateSmsConfigDto): Promise<import("typeorm").UpdateResult>;
    removeSmsConfig(id: number): Promise<import("typeorm").DeleteResult>;
    sendEmail(dto: SendEmailDto): Promise<import("./entities/communication-log.entity").CommunicationLog>;
    sendSms(dto: SendSmsDto): Promise<import("./entities/communication-log.entity").CommunicationLog>;
}
