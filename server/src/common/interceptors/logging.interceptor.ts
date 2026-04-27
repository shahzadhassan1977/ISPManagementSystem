import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, catchError } from 'rxjs';
import { LogService } from '../services/log.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        @InjectQueue('log-queue') private logQueue: Queue,
        private logService: LogService
    ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, params, query, ip } = request;

    // ✅ sanitize request body
    const safeBody = { ...body };
    if (safeBody.password) delete safeBody.password;

    const user = request.user;
    const startTime = Date.now();

    // console.log('📥 REQUEST:', {
    //   method,
    //   url,
    //   body,
    //   params,
    //   query,
    //   time: new Date().toISOString(),
    // });

    return next.handle().pipe(
      tap(async (responseData) => {
        const response = context.switchToHttp().getResponse();
        const data = {
            method,
            url,
            userId: user?.userId,
            ip,
            requestBody: safeBody,
            responseBody: JSON.stringify(responseData).slice(0, 1000),
            statusCode: response.statusCode,
            duration: Date.now() - startTime,
        };
        await this.logQueue.add('log', data ,{attempts:3,backoff:5000,});

        // await this.logService.create({
        //   method,
        //   url,
        //   userId: user?.userId,
        //   userEmail: user?.email,
        //   ip,
        //   requestBody: safeBody,
        //   // ✅ limit response size
        //   responseBody: JSON.stringify(responseData).slice(0, 1000),
        //   statusCode: response.statusCode,
        //   duration: Date.now() - startTime,
        // });

        // console.log('📤 RESPONSE:', {
        //   method,
        //   url,
        //   statusCode: response.statusCode,
        //   duration: `${Date.now() - startTime}ms`,
        //   data: responseData,
        // });
      }),

      catchError(async (error) => {

        const errorData={
            method,
            url,
            userId: user?.userId,
            ip,
            requestBody: safeBody,
            statusCode: error?.status || 500,
            errorMessage: error?.message,
            duration: Date.now() - startTime,
        };

        await this.logQueue.add('log', errorData, {attempts: 3, backoff: 5000,});

        // await this.logService.create({
        //   method,
        //   url,
        //   userId: user?.userId,
        //   userEmail: user?.email,
        //   ip,
        //   requestBody: safeBody,
        //   statusCode: error?.status || 500,
        //   errorMessage: error?.message,
        //   duration: Date.now() - startTime,
        // });

        // console.log('❌ ERROR:', {
        //   method,
        //   url,
        //   statusCode: error?.status || 500,
        //   message: error?.message,
        //   duration: `${Date.now() - startTime}ms`,
        // });

        throw error;
      }),
    );
  }
}