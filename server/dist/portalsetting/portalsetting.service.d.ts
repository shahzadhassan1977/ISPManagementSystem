import { Repository } from 'typeorm';
import { Portalsetting } from './entities/portalsetting.entity';
export declare class PortalsettingService {
    private repo;
    constructor(repo: Repository<Portalsetting>);
    create(dto: any): Promise<any>;
    findAll(): Promise<Portalsetting[]>;
    findOne(id: number): Promise<Portalsetting | null>;
    update(id: number, dto: any): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
