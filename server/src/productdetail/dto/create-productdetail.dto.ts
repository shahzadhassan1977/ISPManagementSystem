import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateProductdetailDto {
  @ApiProperty()
  @IsString()
  company!: string;

  @ApiProperty()
  @IsString()
  package!: string;

  @ApiProperty()
  @IsString()
  bandwidth!: string;

  @ApiProperty()
  @IsNumber()
  productId!: number;
}