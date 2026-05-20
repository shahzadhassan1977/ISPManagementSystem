import { Product } from "../../product/entities/product.entity";
export declare class Productdetail {
    id: number;
    companyId: number;
    package: string;
    bandwidth: string;
    productId: number;
    product: Product;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isDeleted: boolean;
}
