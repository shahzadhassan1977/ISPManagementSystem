import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAreaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;
}