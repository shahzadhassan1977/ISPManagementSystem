import { SubscriptionService } from "./subscription.service";
import { SubscriptiondetailService } from "../subscriptiondetail/subscriptiondetail.service";
import { SubscriptionDto } from "./dto/subscription.dto";
export declare class SubscriptionController {
    private service;
    private SubscriptiondetailService;
    constructor(service: SubscriptionService, SubscriptiondetailService: SubscriptiondetailService);
    create(dto: SubscriptionDto): Promise<import("./entities/subscription.entity").Subscription>;
    findAll(): Promise<{
        subscriptiondetails: import("../subscriptiondetail/entities/subscriptiondetail.entity").Subscriptiondetail | null;
        subscriptionid: number;
        startDate: Date;
        renewalDate: Date;
        billingCycle: string;
        status: string;
        customerId: number;
        productId: number;
        customer: import("../customer/entities/customer.entity").Customer;
        product: import("../product/entities/product.entity").Product;
        payments: import("../payment/entities/payment.entity").Payment[];
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        isDeleted: boolean;
    }[]>;
    findAllByCustomer(customerId?: number): Promise<import("./entities/subscription.entity").Subscription[]>;
    findOne(id: number): Promise<import("./entities/subscription.entity").Subscription | null>;
    update(id: number, dto: SubscriptionDto): Promise<string>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
