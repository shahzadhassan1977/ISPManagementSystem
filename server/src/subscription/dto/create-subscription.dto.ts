import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty()
  @IsNumber()
  customerId!: number;

  @ApiProperty()
  @IsNumber()
  productId!: number;

  @ApiProperty()
  @IsDateString()
  startDate!: Date;

  @ApiProperty()
  @IsDateString()
  renewalDate!: Date;

  @ApiProperty()
  @IsString()
  billingCycle!: string;

  @ApiProperty()
  @IsString()
  status!: string;
}