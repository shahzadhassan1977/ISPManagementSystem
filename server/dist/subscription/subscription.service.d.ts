import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
export declare class SubscriptionService {
    private repo;
    constructor(repo: Repository<Subscription>);
    create(dto: CreateSubscriptionDto): Promise<Subscription>;
    findAll(): Promise<Subscription[]>;
    findOne(id: number): Promise<Subscription | null>;
    update(id: number, dto: UpdateSubscriptionDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findByCustomer(customerId: number): Promise<Subscription[]>;
}
