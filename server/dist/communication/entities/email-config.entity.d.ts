export declare class EmailConfig {
    id: number;
    name: string;
    description?: string;
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPassword: string;
    smtpSecure: boolean;
    fromAddress: string;
    fromName?: string;
    subjectTemplate?: string;
    bodyTemplate?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
