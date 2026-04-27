import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeeSubareaService } from './employeesubarea.service';
import { CreateEmployeeSubareaDto } from './dto/create-employeesubarea.dto';


@Controller('employee-subareas')
export class EmployeeSubareaController {
  constructor(private service: EmployeeSubareaService) {}

  @Post()
  create(@Body() dto: CreateEmployeeSubareaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query('employeeId') employeeId?: number,
    @Query('subareaId') subareaId?: number,
  ) {
    if (employeeId) return this.service.findByEmployee(+employeeId);
    if (subareaId) return this.service.findBySubArea(+subareaId);

    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}