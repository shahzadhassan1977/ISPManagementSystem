import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class AssignPermissionDto {

    @ApiProperty({ type: [Number] })
    @IsNotEmpty()
    @IsArray() // Good practice to include
    @IsNumber({}, { each: true }) 
    permissionIds!: number[];

    @ApiProperty()
    @IsNotEmpty()
    roleId!: number;    
    
}
