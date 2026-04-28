import { ApiLog } from '../entities/api-log.entity';
import { Repository } from 'typeorm';
export declare class LogService {
    private logRepo;
    constructor(logRepo: Repository<ApiLog>);
    create(logData: Partial<ApiLog>): Promise<void>;
}
