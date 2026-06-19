import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class AssignRoleDto {

    @ApiProperty()
    @IsNotEmpty()
    userId!: number;

    @ApiProperty({ type: [Number] })
    @IsNotEmpty()
    @IsArray() // Good practice to include
    @IsNumber({}, { each: true }) 
    roleIds!: number[];    
    
}
