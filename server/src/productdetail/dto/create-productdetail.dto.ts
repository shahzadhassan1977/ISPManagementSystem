import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateProductdetailDto {
  @ApiProperty()
  @IsNumber()
  companyId!: number;

  @ApiProperty()
  @IsString()
  package!: string;

  @ApiProperty()
  @IsString()
  bandwidth!: string;

  @ApiProperty()
  @IsNumber()
  productId!: number;

  @ApiProperty()
  isActive!: boolean;
      
  @ApiProperty()
  isDeleted!: boolean;
}