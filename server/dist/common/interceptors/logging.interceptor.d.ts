import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LogService } from '../services/log.service';
import { Queue } from 'bullmq';
export declare class LoggingInterceptor implements NestInterceptor {
    private logQueue;
    private logService;
    constructor(logQueue: Queue, logService: LogService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
