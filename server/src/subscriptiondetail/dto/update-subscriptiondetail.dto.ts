import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptiondetailDto } from './create-subscriptiondetail.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateSubscriptiondetailDto extends PartialType(CreateSubscriptiondetailDto) {
    @ApiProperty()
    @IsNumber()
    id!: number;
}