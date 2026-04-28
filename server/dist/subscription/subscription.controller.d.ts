import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
export declare class SubscriptionController {
    private service;
    constructor(service: SubscriptionService);
    create(dto: CreateSubscriptionDto): Promise<import("./entities/subscription.entity").Subscription>;
    findAll(customerId?: number): Promise<import("./entities/subscription.entity").Subscription[]>;
    findOne(id: number): Promise<import("./entities/subscription.entity").Subscription | null>;
    update(id: number, dto: UpdateSubscriptionDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
