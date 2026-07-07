import { SubscriptionService } from "./subscription.service";
import { SubscriptiondetailService } from "../subscriptiondetail/subscriptiondetail.service";
import { SubscriptionDto } from "./dto/subscription.dto";
export declare class SubscriptionController {
    private service;
    private SubscriptiondetailService;
    constructor(service: SubscriptionService, SubscriptiondetailService: SubscriptiondetailService);
    create(dto: SubscriptionDto): Promise<import("./entities/subscription.entity").Subscription>;
    findAll(): Promise<import("./entities/subscription.entity").Subscription[]>;
    findAllByCustomer(customerId?: number): Promise<import("./entities/subscription.entity").Subscription[]>;
    findOne(id: number): Promise<import("./entities/subscription.entity").Subscription | null>;
    update(id: number, dto: SubscriptionDto): Promise<string>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
