import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateSmsConfigDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  provider!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  apiKey?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  apiSecret?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  senderId?: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  whatsappEnabled!: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  whatsappNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  smsTemplate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  whatsappTemplate?: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  isActive!: boolean;
}
