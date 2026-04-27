import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber()
  amount!: number;

  @ApiProperty()
  @IsNumber()
  otherAmount!: number;

  @ApiProperty()
  @IsString()
  invoiceNumber!: string;

  @ApiProperty()
  @IsString()
  billingMonth!: string;

  @ApiProperty()
  @IsString()
  billingYear!: string;

  @ApiProperty()
  @IsString()
  status!: string;

  @ApiProperty()
  @IsNumber()
  customerId!: number;

  @ApiProperty()
  @IsNumber()
  subscriptionId!: number;
}