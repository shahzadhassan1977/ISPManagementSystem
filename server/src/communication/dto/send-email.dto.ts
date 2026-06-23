import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eventType!: string;

  @ApiProperty()
  @IsEmail()
  recipient!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  body?: string;

  @ApiProperty({ required: false })
  payload?: Record<string, any>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  templateName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  relatedTable?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  relatedId?: number;
}
