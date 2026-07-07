export declare class CreatePaymentDto {
    amount: number;
    otherAmount: number;
    invoiceNumber: string;
    comments: string;
    billingMonth: string;
    billingYear: string;
    status: string;
    customerId: number;
    subscriptionId: number;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: number;
    updatedBy: number;
    paymentMethod: string;
}
