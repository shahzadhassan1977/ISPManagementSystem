import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  phone!: string;
  
  @ApiProperty()
  @IsString()
  address!: string;

  @ApiProperty()
  @IsString()
  cnic!: string;

  @ApiProperty()
  @IsString()
  mobile!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  isDeleted!: boolean;
}