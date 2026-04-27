import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { LogService } from './services/log.service';

@Processor('log-queue')
export class LogProcessor extends WorkerHost {
  constructor(private logService: LogService) {
    super();
  }

  async process(job: Job<any>): Promise<void> {
    await this.logService.create(job.data);
  }
}