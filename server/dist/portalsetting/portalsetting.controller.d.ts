import { PortalsettingService } from './portalsetting.service';
export declare class PortalsettingController {
    private service;
    constructor(service: PortalsettingService);
    create(dto: any): Promise<any>;
    findAll(): Promise<import("./entities/portalsetting.entity").Portalsetting[]>;
    findOne(id: number): Promise<import("./entities/portalsetting.entity").Portalsetting | null>;
    update(id: number, dto: any): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
