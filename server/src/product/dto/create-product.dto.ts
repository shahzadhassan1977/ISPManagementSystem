import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNumber()
  salePrice!: number;

  @ApiProperty()
  @IsNumber()
  purchasePrice!: number;

  @ApiProperty()
  isActive!: boolean;
      
  @ApiProperty()
  isDeleted!: boolean;
}