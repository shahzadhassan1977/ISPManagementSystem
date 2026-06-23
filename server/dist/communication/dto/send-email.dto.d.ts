export declare class SendEmailDto {
    eventType: string;
    recipient: string;
    subject?: string;
    body?: string;
    payload?: Record<string, any>;
    templateName?: string;
    relatedTable?: string;
    relatedId?: number;
}
