import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeSubareaDto } from './create-employeesubarea.dto';

export class UpdateEmployeeSubAreaDto extends PartialType(
  CreateEmployeeSubareaDto,
) {}