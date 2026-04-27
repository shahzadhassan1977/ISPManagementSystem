import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiLog } from './entities/api-log.entity';
import { LogService } from './services/log.service';
import { ChangeLog } from './entities/change-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApiLog, ChangeLog])],
  providers: [LogService],
  exports: [LogService],
})
export class CommonModule {}