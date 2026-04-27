import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
        @ApiProperty()
        @IsNotEmpty()
        name?: string;    
        
}
