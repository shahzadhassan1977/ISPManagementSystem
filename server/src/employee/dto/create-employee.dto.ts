import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mobile!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  designation!: string;

  @ApiProperty()
  isActive!: boolean;
      
  @ApiProperty()
  isDeleted!: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  companyId!: number;

  @ApiProperty()
  createdAt!: Date;
  
  @ApiProperty()
  updatedAt!: Date;
  
  @ApiProperty()
  createdBy!: number;
      
  @ApiProperty()
  updatedBy!: number;  

}