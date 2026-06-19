import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../../auth/entities/role.entity';

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    name!: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password!: string;
    
    @ApiProperty()
    isActive!: boolean;
    
    @ApiProperty()
    isDeleted!: boolean;
    
    @ApiProperty()
    createdAt!: Date;
    
}
