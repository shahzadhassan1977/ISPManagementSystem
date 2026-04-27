import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { QueryFailedError } from 'typeorm';
import { SearchEmployeeDto } from './dto/search-employee.dto';
import { Company } from '../company/entities/company.entity';
import { AssignSubareaDto } from './dto/assign-subarea.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post('create-employee')
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      console.log('Received DTO:', createEmployeeDto); // Debug log
      return this.employeeService.create(createEmployeeDto);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        console.error('SQL Query:', err.query);
        console.error('Parameters:', err.parameters);
        // Access database-specific error codes (e.g., '23505' for Postgres unique violation)
        console.error('DB Error Code:', (err.driverError as any).code);
      }
    }
  }

  @Get()
  findAll() {
    try {
      return this.employeeService.findAll();
    } catch (err) {
      if (err instanceof QueryFailedError) {
        console.error('SQL Query:', err.query);
        console.error('Parameters:', err.parameters);
        // Access database-specific error codes (e.g., '23505' for Postgres unique violation)
        console.error('DB Error Code:', (err.driverError as any).code);
      }
    }
  }

  @Get(':id')
  findOne(@Param('id') employeeid: string) {
    try {
      return this.employeeService.findOne(+employeeid);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        console.error('SQL Query:', err.query);
        console.error('Parameters:', err.parameters);
        // Access database-specific error codes (e.g., '23505' for Postgres unique violation)
        console.error('DB Error Code:', (err.driverError as any).code);
      }
    }
  }

  @Post('EmployeeByEmail')
  findOneByEmail(@Body() searchEmployeeDto: SearchEmployeeDto) {
    try {
      return this.employeeService.findOneByEmail(searchEmployeeDto.email);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        console.error('SQL Query:', err.query);
        console.error('Parameters:', err.parameters);
        // Access database-specific error codes (e.g., '23505' for Postgres unique violation)
        console.error('DB Error Code:', (err.driverError as any).code);
      }
    }
  }

  @Post('EmployeeByCompany/:companyId')
  findByCompany(@Param('companyId') companyId: string) {
    try {
      //console.log('Finding employees for companyId:', companyId); // Debug log
      return this.employeeService.findByCompany(+companyId);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        console.error('SQL Query:', err.query);
        console.error('Parameters:', err.parameters);
        // Access database-specific error codes (e.g., '23505' for Postgres unique violation)
        console.error('DB Error Code:', (err.driverError as any).code);
      }
    }
  }

  @Put(':id')
  update(
    @Param('id') employeeid: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      return this.employeeService.update(+employeeid, updateEmployeeDto);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        console.error('SQL Query:', err.query);
        console.error('Parameters:', err.parameters);
        // Access database-specific error codes (e.g., '23505' for Postgres unique violation)
        console.error('DB Error Code:', (err.driverError as any).code);
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.employeeService.remove(+id);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        console.error('SQL Query:', err.query);
        console.error('Parameters:', err.parameters);
        // Access database-specific error codes (e.g., '23505' for Postgres unique violation)
        console.error('DB Error Code:', (err.driverError as any).code);
      }
    }
  }

  @Post('AssignSubarea')
  assignSubarea(@Body() assignSubareaDto: AssignSubareaDto) {
    return this.employeeService.assignMultipleSubareas(
      assignSubareaDto.employeeId,
      assignSubareaDto.subareaIds,
    );
  }
}
