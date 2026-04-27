import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SubscriptiondetailService } from './subscriptiondetail.service';
import { CreateSubscriptiondetailDto } from './dto/create-subscriptiondetail.dto';
import { UpdateSubscriptiondetailDto } from './dto/update-subscriptiondetail.dto';

@Controller('subscription-details')
export class SubscriptiondetailController {
  constructor(private service: SubscriptiondetailService) {}

  @Post()
  create(@Body() dto: CreateSubscriptiondetailDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateSubscriptiondetailDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}