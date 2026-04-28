export declare class ApiLog {
    id: number;
    method: string;
    url: string;
    userId?: string;
    userEmail?: string;
    ip?: string;
    requestBody?: any;
    responseBody?: any;
    statusCode?: number;
    duration?: number;
    errorMessage?: string;
    createdAt: Date;
}
