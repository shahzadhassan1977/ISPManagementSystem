import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { LogProcessor } from './log.processor';
import { LogService } from './services/log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiLog } from './entities/api-log.entity';
import { ChangeLog } from './entities/change-log.entity';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'log-queue',
    }),
    TypeOrmModule.forFeature([ApiLog, ChangeLog]),
  ],
  providers: [LogProcessor, LogService],
  exports: [BullModule],
})
export class LogQueueModule {}