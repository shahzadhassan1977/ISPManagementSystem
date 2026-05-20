import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePermissionDto {

    @ApiProperty()
    @IsNotEmpty()
    name!: string;

    @ApiProperty()
  isActive!: boolean;
      
  @ApiProperty()
  isDeleted!: boolean;
    
}
