export declare class CreateSubscriptionDto {
    customerId: number;
    productId: number;
    startDate: Date;
    renewalDate: Date;
    billingCycle: string;
    status: string;
    isActive: boolean;
    isDeleted: boolean;
}
