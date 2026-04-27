import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Subarea } from '../subarea/entities/subarea.entity';
import { SubareaModule } from '../subarea/subarea.module';
import { EmployeeSubareaModule } from '../employeesubarea/employeesubarea.module';
import { EmployeeSubarea } from '../employeesubarea/entities/employeesubarea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Subarea, EmployeeSubarea,]), 
  SubareaModule,            // ✅ already needed
  EmployeeSubareaModule,    // ✅ THIS FIXES ERROR
],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports:[EmployeeService, TypeOrmModule],
})
export class EmployeeModule {}
