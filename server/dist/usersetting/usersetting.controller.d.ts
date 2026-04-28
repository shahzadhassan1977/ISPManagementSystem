import { UsersettingService } from './usersetting.service';
export declare class UsersettingController {
    private service;
    constructor(service: UsersettingService);
    create(dto: any): Promise<any>;
    findAll(): Promise<import("./entities/usersetting.entity").Usersetting[]>;
    findOne(id: number): Promise<import("./entities/usersetting.entity").Usersetting | null>;
    update(id: number, dto: any): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
