import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendSmsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eventType!: string;

  @ApiProperty()
  @IsString()
  recipient!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  body?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  templateName?: string;

  @ApiProperty({ required: false })
  payload?: Record<string, any>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  relatedTable?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  relatedId?: number;
}
