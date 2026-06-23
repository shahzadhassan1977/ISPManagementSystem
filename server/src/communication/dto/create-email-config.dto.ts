import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmailConfigDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  smtpHost!: string;

  @ApiProperty()
  @IsInt()
  smtpPort!: number;

  @ApiProperty()
  @IsString()
  smtpUser!: string;

  @ApiProperty()
  @IsString()
  smtpPassword!: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  smtpSecure!: boolean;

  @ApiProperty()
  @IsString()
  fromAddress!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fromName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  subjectTemplate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bodyTemplate?: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  isActive!: boolean;
}
