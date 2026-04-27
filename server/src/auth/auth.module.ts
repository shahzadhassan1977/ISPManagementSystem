//src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    ConfigModule, // ✅ IMPORTANT

    JwtModule.registerAsync({
      imports: [ConfigModule], // ✅ REQUIRED
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN') || 3600,
        },
      }),
      global: true, // optional
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}