import { Subscription } from '../../subscription/entities/subscription.entity';
import { Payment } from '../../payment/entities/payment.entity';
export declare class Customer {
    customerid: number;
    name: string;
    phone: string;
    address: string;
    cnic: string;
    mobile: string;
    email: string;
    isActive: boolean;
    isDeleted: boolean;
    subscriptions: Subscription[];
    payments: Payment[];
    createdAt: Date;
    updatedAt: Date;
}
