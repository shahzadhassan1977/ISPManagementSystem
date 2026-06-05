import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    @ApiProperty()
    @IsNumber()
    id!: number;
}