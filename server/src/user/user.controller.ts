import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryFailedError } from 'typeorm';
import { SearchUserDto } from './dto/search-user.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { ApiBody } from '@nestjs/swagger';
import { AssignRoleDto } from './dto/assign-role.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
  // @Roles('Admin')
  // @Permissions('create_user')

  @Post('create-user')
  create(@Body() createUserDto: CreateUserDto) {
    try
    {
        return this.userService.create(createUserDto);
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
      return this.userService.findAll();
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
      return this.userService.findOne(+id);
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

  @Post('UserByEmail')
  findOneByEmail(@Body() searchUserDto: SearchUserDto) {
    try
    {
      return this.userService.findOneByEmail(searchUserDto.email);
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try
    {
      return this.userService.update(+id, updateUserDto);
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
      return this.userService.remove(+id);
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

  @Post('AssignRole')
  assignRole(@Body() assignRoleDto: AssignRoleDto) {
    return this.userService.assignMultipleRoles(assignRoleDto.userId, assignRoleDto.roleIds);
  }

}
