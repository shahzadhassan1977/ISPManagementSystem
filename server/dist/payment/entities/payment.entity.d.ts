import { Customer } from '../../customer/entities/customer.entity';
import { Subscription } from '../../subscription/entities/subscription.entity';
export declare class Payment {
    id: number;
    amount: number;
    otherAmount: number;
    invoiceNumber: string;
    comments: string;
    billingMonth: string;
    billingYear: string;
    status: string;
    customerId: number;
    subscriptionId: number;
    customer: Customer;
    subscription: Subscription;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isDeleted: boolean;
}
