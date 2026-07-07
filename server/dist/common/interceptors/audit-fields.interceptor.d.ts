import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
export declare class AuditFieldsInterceptor implements NestInterceptor {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
    private resolveUser;
    private extractUserId;
}
