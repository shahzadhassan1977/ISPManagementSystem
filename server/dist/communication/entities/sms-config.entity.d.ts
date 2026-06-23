export declare class SmsConfig {
    id: number;
    name: string;
    description?: string;
    provider: string;
    apiKey?: string;
    apiSecret?: string;
    senderId?: string;
    whatsappEnabled: boolean;
    whatsappNumber?: string;
    smsTemplate?: string;
    whatsappTemplate?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
