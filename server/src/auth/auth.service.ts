//src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
) {}

  async signIn(
    email: string, 
    pass: string,
    ): Promise<{access_token: string}> {
    
    const user = await this.usersService.findOneByEmail(email);
    //const hashed= await bcrypt.hash(pass, 10);    
    const userpassword= user.password as string;

    if (!user || !(await bcrypt.compare(pass, userpassword))) {
      throw new UnauthorizedException();
    }
    const roles = user.userRoles.map((ur) => ur.role.name);

    const permissions = user.userRoles.flatMap((ur) =>
    ur.role.rolePermissions.map((rp) => rp.permission.name),
    );
   
    const payload: JwtPayload = {
            sub: user.userid?.toString(),
            email: user.email,
            roles: roles,

            permissions: permissions,
        
    };
    
    
    // const payload = {  
    //     sub: user.userid,
    //     email: user.email,
    //     roles,
    //     permissions,        
    //      };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload 
      // is the key that was passed in the JwtModule
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user != null) {
      return true;
    }
    return null;
  }

  async createOTP(email: string) {
      // Generate a 6-digit OTP
      return await this.usersService.createOTP(email);
  }


  async validateOTP(email: string, code: string): Promise<boolean> {
    // const otpRecord = await this.prisma.auth_otp.findFirst({
    //   where: {
    //     email,
    //     code,
    //     expires_at: { gt: new Date() },
    //     is_used: false,
    //   },
    // });

    return false; //otpRecord != null;
  }
}
