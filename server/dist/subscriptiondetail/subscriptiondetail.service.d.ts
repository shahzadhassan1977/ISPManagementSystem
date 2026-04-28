import { Subscriptiondetail } from './entities/subscriptiondetail.entity';
import { Repository } from 'typeorm';
import { CreateSubscriptiondetailDto } from './dto/create-subscriptiondetail.dto';
import { UpdateSubscriptiondetailDto } from './dto/update-subscriptiondetail.dto';
export declare class SubscriptiondetailService {
    private repo;
    constructor(repo: Repository<Subscriptiondetail>);
    create(dto: CreateSubscriptiondetailDto): Promise<Subscriptiondetail>;
    findAll(): Promise<Subscriptiondetail[]>;
    findOne(id: number): Promise<Subscriptiondetail | null>;
    update(id: number, dto: UpdateSubscriptiondetailDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
