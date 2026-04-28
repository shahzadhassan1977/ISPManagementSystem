import { SubscriptiondetailService } from './subscriptiondetail.service';
import { CreateSubscriptiondetailDto } from './dto/create-subscriptiondetail.dto';
import { UpdateSubscriptiondetailDto } from './dto/update-subscriptiondetail.dto';
export declare class SubscriptiondetailController {
    private service;
    constructor(service: SubscriptiondetailService);
    create(dto: CreateSubscriptiondetailDto): Promise<import("./entities/subscriptiondetail.entity").Subscriptiondetail>;
    findAll(): Promise<import("./entities/subscriptiondetail.entity").Subscriptiondetail[]>;
    findOne(id: number): Promise<import("./entities/subscriptiondetail.entity").Subscriptiondetail | null>;
    update(id: number, dto: UpdateSubscriptiondetailDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
