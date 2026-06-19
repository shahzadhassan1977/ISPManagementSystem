import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SearchUserDto {

    
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    
}
