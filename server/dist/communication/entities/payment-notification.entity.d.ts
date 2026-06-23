export declare class PaymentNotification {
    id: number;
    paymentId: number;
    customerId: number;
    channel: string;
    eventType: string;
    templateName?: string;
    recipient?: string;
    subject?: string;
    body?: string;
    payload?: any;
    status: string;
    isSent: boolean;
    sentAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
