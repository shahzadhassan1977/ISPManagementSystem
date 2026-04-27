import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { QueryFailedError } from 'typeorm';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Post()
      create(@Body() createPermissionDto: CreatePermissionDto) {
        try
        {
            return this.permissionService.create(createPermissionDto);
        }
        catch(err)
        {
          if(err instanceof QueryFailedError){
            console.error('SQL Query:', err.query);
            console.error('Parameters:', err.parameters);
            // Access database-specific error codes (e.g., '23505' for Postgres unique violation)
            console.error('DB Error Code:', (err.driverError as any).code);
          }      
        }    
    }

    @Get()
      findAll() {
        try
        {
          return this.permissionService.findAll();
        }
        catch(err)
        {
          if(err instanceof QueryFailedError){
            console.error('SQL Query:', err.query);
            console.error('Parameters:', err.parameters);
            // Access database-specific error codes (e.g., '23505' for Postgres unique violation)
            console.error('DB Error Code:', (err.driverError as any).code);
          } 
        }
        
    }
    
    @Get(':id')
      findOne(@Param('id') id: string) {
        try
        {
          return this.permissionService.findOne(+id);
        }
        catch(err)
        {
          if(err instanceof QueryFailedError){
            console.error('SQL Query:', err.query);
            console.error('Parameters:', err.parameters);
            // Access database-specific error codes (e.g., '23505' for Postgres unique violation)
            console.error('DB Error Code:', (err.driverError as any).code);
          } 
        }
        
    }

    @Patch(':id')
      update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
        try
        {
          return this.permissionService.update(+id, updatePermissionDto);
        }
        catch(err)
        {
          if(err instanceof QueryFailedError){
            console.error('SQL Query:', err.query);
            console.error('Parameters:', err.parameters);
            // Access database-specific error codes (e.g., '23505' for Postgres unique violation)
            console.error('DB Error Code:', (err.driverError as any).code);
          } 
        }
      }
    
      @Delete(':id')
      remove(@Param('id') id: string) {
        try
        {
          return this.permissionService.remove(+id);
        }
        catch(err)
        {
          if(err instanceof QueryFailedError){
            console.error('SQL Query:', err.query);
            console.error('Parameters:', err.parameters);
            // Access database-specific error codes (e.g., '23505' for Postgres unique violation)
            console.error('DB Error Code:', (err.driverError as any).code);
          } 
        }
      }


}
