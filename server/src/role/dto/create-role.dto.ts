import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRoleDto {

    @ApiProperty()
    @IsNotEmpty()
    name!: string;

    @ApiProperty()
  isActive!: boolean;
      
  @ApiProperty()
  isDeleted!: boolean;
    
}
