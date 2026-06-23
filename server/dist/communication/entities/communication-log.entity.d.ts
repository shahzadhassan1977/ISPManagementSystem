export declare class CommunicationLog {
    id: number;
    channel: string;
    eventType: string;
    recipient: string;
    subject?: string;
    body?: string;
    status: string;
    errorMessage?: string;
    relatedTable?: string;
    relatedId?: number;
    payload?: any;
    createdAt: Date;
}
