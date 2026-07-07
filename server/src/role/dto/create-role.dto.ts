import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRoleDto {

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
