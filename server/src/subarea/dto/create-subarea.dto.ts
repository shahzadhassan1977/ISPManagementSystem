import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateSubareaDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNumber()
  areaId!: number;

  @ApiProperty()
  isActive!: boolean;
      
  @ApiProperty()
  isDeleted!: boolean;
 
}