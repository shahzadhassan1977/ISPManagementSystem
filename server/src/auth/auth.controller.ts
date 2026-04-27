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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @Get('admin')
    getAdmin() {
    return 'Admin Only';
    }

    @Post("request-otp")
    requestOtp(@Body() body: { email: string }) {
        const isvaliduser = this.authService.validateUser(body.email);
        if (!isvaliduser) {
            throw new BadRequestException("User not found");
        }

        const code = this.authService.createOTP(body.email);
        // send email logic here (using nodemailer or any email service)

        
        // await this.mailService.sendMail({
        //     to: body.email,
        //     subject: "Your Login Code",
        //     text: `Your OTP is ${code}`,
        // });

        return { message: "OTP sent" };
    }

    @Post("verify-otp")
        async verifyOtp(@Body() body: { email: string; code: string }) {
        // const otp = await this.prisma.auth_otp.findFirst({
        //     where: {
        //     email: body.email,
        //     code: body.code,
        //     is_used: false,
        //     expires_at: { gt: new Date() },
        //     },
        // });

        // if (!otp) {
        //     throw new BadRequestException("Invalid or expired OTP");
        // }

        // // mark used
        // await this.prisma.auth_otp.update({
        //     where: { id: otp.id },
        //     data: { is_used: true },
        // });

        // // generate JWT
        // const token = this.jwtService.sign({ email: body.email });

       // return { access_token: token };
    }
}
