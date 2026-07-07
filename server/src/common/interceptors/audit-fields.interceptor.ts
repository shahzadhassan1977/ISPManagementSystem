import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuditFieldsInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const method = req?.method?.toUpperCase();

    if (req?.body && typeof req.body === 'object' && !Array.isArray(req.body)) {
      const user = await this.resolveUser(req);
      const userId = this.extractUserId(user);

      if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        if (req.body.createdAt == null || req.body.createdAt === '') {
          req.body.createdAt = new Date();
        }

        if (req.body.updatedAt == null || req.body.updatedAt === '') {
          req.body.updatedAt = new Date();
        }

        if (req.body.createdBy == null || req.body.createdBy === '') {
          req.body.createdBy = userId;
        }

        if (req.body.updatedBy == null || req.body.updatedBy === '') {
          req.body.updatedBy = userId;
        }
      }
    }

    return next.handle();
  }

  private async resolveUser(req: any) {
    if (req?.user) {
      return req.user;
    }

    const authHeader = req?.headers?.authorization;
    if (typeof authHeader !== 'string') {
      return null;
    }

    const [, token] = authHeader.split(' ');
    if (!token) {
      return null;
    }

    try {
      return await this.jwtService.verifyAsync(token);
    } catch {
      return null;
    }
  }

  private extractUserId(user: any): number {
    if (!user) {
      return 0;
    }

    const raw = user.userId ?? user.sub ?? user.userid ?? user.id ?? user.user?.id;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  }
}
