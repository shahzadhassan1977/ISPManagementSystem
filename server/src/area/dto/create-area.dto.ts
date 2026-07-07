import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAreaDto {
  @ApiProperty()
  @IsNotEmpty()
  name!: string;

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