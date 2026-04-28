import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { LogService } from './services/log.service';
export declare class LogProcessor extends WorkerHost {
    private logService;
    constructor(logService: LogService);
    process(job: Job<any>): Promise<void>;
}
