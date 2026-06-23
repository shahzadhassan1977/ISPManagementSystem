export declare class SendSmsDto {
    eventType: string;
    recipient: string;
    body?: string;
    templateName?: string;
    payload?: Record<string, any>;
    relatedTable?: string;
    relatedId?: number;
}
