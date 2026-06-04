import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDateString, IsOptional } from "class-validator";

export class SubscriptionDto {
  @ApiProperty()
  @IsNumber()
  subscriptionid!: number;

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

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  isDeleted!: boolean;

  @ApiProperty()
  @IsDateString()
  installationDate!: Date;

  @ApiProperty()
  @IsNumber()
  installationCharges!: number;

  @ApiProperty()
  @IsNumber()
  wireCharges!: number;

  @ApiProperty()
  @IsNumber()
  deviceCharges!: number;

  @ApiProperty()
  @IsNumber()
  splitterCharges!: number;

  @ApiProperty()
  @IsNumber()
  fee!: number;

  @ApiProperty()
  @IsNumber()
  otherCharges!: number;

  @ApiProperty()
  @IsNumber()
  paid!: number;

  @ApiProperty()
  @IsNumber()
  remainingBalance!: number;

  @ApiProperty()
  @IsString()
  deviceMac!: string;

  @ApiProperty()
  @IsString()
  userId!: string;

  @ApiProperty()
  @IsString()
  password!: string;

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
  @IsDateString()
  createdAt!: Date;

  @ApiProperty()
  @IsDateString()
  updatedAt!: Date;

  @ApiProperty()
  @IsNumber()
  id!: number;
}
