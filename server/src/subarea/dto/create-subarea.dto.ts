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

  @ApiProperty()
  createdAt!: Date;
  
  @ApiProperty()
  updatedAt!: Date;
  
  @ApiProperty()
  createdBy!: number;
      
  @ApiProperty()
  updatedBy!: number;
 
}