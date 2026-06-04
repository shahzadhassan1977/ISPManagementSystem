import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionDto } from './create-subscription.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
    @ApiProperty()
    @IsNumber()
    subscriptionid!: number;
}