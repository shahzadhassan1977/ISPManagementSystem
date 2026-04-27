import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
        @ApiProperty()
        @IsNotEmpty()
        name?: string;    
        
}
