import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateSubscriptiondetailDto {
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  installationDate?: Date;

  @ApiProperty()
  @IsNumber()
  installationCharges!: number;

  @ApiProperty()
  @IsNumber()
  wireCharges!: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  deviceCharges?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  splitterCharges?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  fee?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  otherCharges?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  paid?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  remainingBalance?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  deviceMac?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  staticIP!: string;

  @ApiProperty()
  @IsString()
  olt!: string;

  @ApiProperty()
  @IsString()
  oltPort!: string;

  @ApiProperty()
  @IsString()
  splitter!: string;

  @ApiProperty()
  @IsString()
  splitterPort!: string;

  @ApiProperty()
  @IsNumber()
  subscriptionId!: number;

  @ApiProperty()
  @IsNumber()
  linemanId!: number;

  @ApiProperty()
  @IsNumber()
  areaRecoveryOfficerId!: number;

  @ApiProperty()
  @IsOptional()
  isActive?: boolean;
      
  @ApiProperty()
  @IsOptional()
  isDeleted?: boolean;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date;
  
  @ApiProperty()
  @IsOptional()
  updatedAt?: Date;
  
  @ApiProperty()
  @IsOptional()
  createdBy?: number;
      
  @ApiProperty()
  @IsOptional()
  updatedBy?: number;
}