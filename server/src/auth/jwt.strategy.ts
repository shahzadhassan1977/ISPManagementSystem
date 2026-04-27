// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('JWT_SECRET is not defined in .env');
    }

    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret,
        ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    // ✅ This becomes req.user

    return {
      userId: payload.sub,
      email: payload.email,

      // normalize roles
      roles: payload.roles ?? [],

      // optional
      permissions: payload.permissions ?? [],
    };
  }
}