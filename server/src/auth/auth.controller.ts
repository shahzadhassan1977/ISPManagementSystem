//src/auth/auth.controller.ts
import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from './guards/roles.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { Roles } from './decorators/roles.decorator';
import { Permissions } from './decorators/permissions.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiBearerAuth('access_token')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: LoginDto) {        
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @UseGuards(
        JwtAuthGuard, 
        RolesGuard
    )
    @Roles('Sale')
    //@Permissions('create_user')    
    @Get('profile')
    getProfile(@Request() req) {
        return {message: "I am In ...."};
    }

}
