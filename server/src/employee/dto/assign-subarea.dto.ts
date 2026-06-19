import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class AssignSubareaDto {

    @ApiProperty()
    @IsNotEmpty()
    employeeId!: number;

    @ApiProperty({ type: [Number] })
    @IsNotEmpty()
    @IsArray() // Good practice to include
    @IsNumber({}, { each: true }) 
    subareaIds!: number[];    
    
}
