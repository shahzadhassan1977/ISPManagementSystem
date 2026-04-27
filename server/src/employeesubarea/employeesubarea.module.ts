import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeSubarea } from './entities/employeesubarea.entity';
import { EmployeeSubareaService } from './employeesubarea.service';
import { EmployeeSubareaController } from './employeesubarea.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeSubarea])
     ],
  providers: [
    EmployeeSubareaService
    ],
  controllers: [
        EmployeeSubareaController
    ],
    exports:[
        EmployeeSubareaService,
        TypeOrmModule,
    ]
})
export class EmployeeSubareaModule {}