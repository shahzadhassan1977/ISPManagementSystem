import { Repository } from 'typeorm';
import { Usersetting } from './entities/usersetting.entity';
export declare class UsersettingService {
    private repo;
    constructor(repo: Repository<Usersetting>);
    create(dto: any): Promise<any>;
    findAll(): Promise<Usersetting[]>;
    findOne(id: number): Promise<Usersetting | null>;
    update(id: number, dto: any): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
