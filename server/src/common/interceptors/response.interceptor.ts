import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        error: null,
        statusCode: context.switchToHttp().getResponse().statusCode,
        timestamp: new Date().toISOString(),
        message: 'Success',
        data: data ?? [],
      })),
    );
  }
}