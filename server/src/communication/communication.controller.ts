import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { CreateEmailConfigDto } from './dto/create-email-config.dto';
import { UpdateEmailConfigDto } from './dto/update-email-config.dto';
import { CreateSmsConfigDto } from './dto/create-sms-config.dto';
import { UpdateSmsConfigDto } from './dto/update-sms-config.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { SendSmsDto } from './dto/send-sms.dto';

@Controller('communication')
export class CommunicationController {
  constructor(private readonly service: CommunicationService) {}

  @Post('email-config')
  createEmailConfig(@Body() dto: CreateEmailConfigDto) {
    return this.service.createEmailConfig(dto);
  }

  @Get('email-config')
  findEmailConfigs() {
    return this.service.findEmailConfigs();
  }

  @Get('email-config/:id')
  findEmailConfig(@Param('id') id: number) {
    return this.service.findEmailConfig(+id);
  }

  @Put('email-config/:id')
  updateEmailConfig(@Param('id') id: number, @Body() dto: UpdateEmailConfigDto) {
    return this.service.updateEmailConfig(+id, dto);
  }

  @Delete('email-config/:id')
  removeEmailConfig(@Param('id') id: number) {
    return this.service.removeEmailConfig(+id);
  }

  @Post('sms-config')
  createSmsConfig(@Body() dto: CreateSmsConfigDto) {
    return this.service.createSmsConfig(dto);
  }

  @Get('sms-config')
  findSmsConfigs() {
    return this.service.findSmsConfigs();
  }

  @Get('sms-config/:id')
  findSmsConfig(@Param('id') id: number) {
    return this.service.findSmsConfig(+id);
  }

  @Put('sms-config/:id')
  updateSmsConfig(@Param('id') id: number, @Body() dto: UpdateSmsConfigDto) {
    return this.service.updateSmsConfig(+id, dto);
  }

  @Delete('sms-config/:id')
  removeSmsConfig(@Param('id') id: number) {
    return this.service.removeSmsConfig(+id);
  }

  @Post('send-email')
  sendEmail(@Body() dto: SendEmailDto) {
    return this.service.sendEmail(dto);
  }

  @Post('send-sms')
  sendSms(@Body() dto: SendSmsDto) {
    return this.service.sendSms(dto);
  }
}
