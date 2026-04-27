import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiLog } from '../entities/api-log.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(ApiLog)
    private logRepo: Repository<ApiLog>,
  ) {}

  async create(logData: Partial<ApiLog>) {
    try {
      const safeBody =  logData.responseBody;
      if (safeBody.password) delete safeBody.password;
      const log = this.logRepo.create(logData);
      await this.logRepo.save(log);
    } catch (err) {
        if(err instanceof QueryFailedError){
        console.error('SQL Query:', err.query);
        console.error('Parameters:', err.parameters);
        // Access database-specific error codes (e.g., '23505' for Postgres unique violation)
        console.error('Log Save Failed:', (err.driverError as any).message);
      }
    }
  }
}