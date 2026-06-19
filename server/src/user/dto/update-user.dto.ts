import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
        @ApiProperty()
        @IsNotEmpty()
        name?: string;
    
        @ApiProperty()
        @IsEmail()
        @IsNotEmpty()
        email?: string;
    
        @ApiProperty()
        @IsString()
        @IsNotEmpty()
        @MinLength(6)
        password?: string;

        @ApiProperty()
        isActive!: boolean;
    
        @ApiProperty()
        isDeleted!: boolean;
}
