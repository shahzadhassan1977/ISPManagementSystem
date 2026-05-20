import { Customer } from "../../customer/entities/customer.entity";
import { Product } from "../../product/entities/product.entity";
import { Subscriptiondetail } from "../../subscriptiondetail/entities/subscriptiondetail.entity";
import { Payment } from "../../payment/entities/payment.entity";
export declare class Subscription {
    subscriptionid: number;
    startDate: Date;
    renewalDate: Date;
    billingCycle: string;
    status: string;
    customerId: number;
    productId: number;
    customer: Customer;
    product: Product;
    subscriptiondetails: Subscriptiondetail[];
    payments: Payment[];
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isDeleted: boolean;
}
