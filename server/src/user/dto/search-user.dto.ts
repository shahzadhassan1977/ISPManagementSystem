import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SearchUserDto {

    
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    
}
