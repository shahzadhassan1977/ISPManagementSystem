import { PartialType } from '@nestjs/mapped-types';
import { CreateSubareaDto } from './create-subarea.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateSubareaDto extends PartialType(CreateSubareaDto) {
     
    @ApiProperty()
     @IsNotEmpty()
     name?: string; 
    
        @ApiProperty()
        @IsNotEmpty()
        areaId?: number;

        @ApiProperty()
  isActive!: boolean;
      
  @ApiProperty()
  isDeleted!: boolean;
}