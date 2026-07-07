import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty()
  customerId!: number;

  @ApiProperty()
  productId!: number;

  @ApiProperty()
  startDate!: Date;

  @ApiProperty()
  renewalDate!: Date;

  @ApiProperty()
  billingCycle!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  isActive!: boolean;
      
  @ApiProperty()
  isDeleted!: boolean;

  @ApiProperty()
  createdAt?: Date;
  
  @ApiProperty()
  updatedAt?: Date;
  
  @ApiProperty()
  createdBy?: number;
      
  @ApiProperty()
  updatedBy?: number;
}