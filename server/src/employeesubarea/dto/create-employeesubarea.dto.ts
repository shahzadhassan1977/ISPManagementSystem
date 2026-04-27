import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateEmployeeSubareaDto {
  @ApiProperty()
  @IsNumber()
  employeeId!: number;

  @ApiProperty()
  @IsNumber()
  subareaId!: number;
}