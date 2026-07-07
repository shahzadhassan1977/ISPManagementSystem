export declare class CreateCompanyDto {
    name: string;
    address: string;
    email: string;
    phone: string;
    cardRechargeURL?: string;
    isActive: boolean;
    isDeleted: boolean;
    isOwner: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: number;
    updatedBy: number;
}
