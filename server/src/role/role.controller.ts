import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryFailedError } from 'typeorm';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignPermissionDto } from './dto/assign-permission.dto';

@Controller('role')
export class RoleController {
     constructor(private readonly roleService: RoleService) {}

        @Post()
        create(@Body() createRoleDto: CreateRoleDto) {
            try
            {
                return this.roleService.create(createRoleDto);
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
               return this.roleService.findAll();
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
              return this.roleService.findOne(+id);
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
     
        @Put(':id')
        update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
                try
                {
                    return this.roleService.update(+id, updateRoleDto);
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
                return this.roleService.remove(+id);
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

        @Post('AssignPermission')
        assignPermission(@Body() assignPermissionDto: AssignPermissionDto) {
            return this.roleService.assignMultiplePermissions(assignPermissionDto.roleId, assignPermissionDto.permissionIds);
        }
     
}
