import { Product } from "../../product/entities/product.entity";
export declare class Productdetail {
    id: number;
    company: string;
    package: string;
    bandwidth: string;
    productId: number;
    product: Product;
    createdAt: Date;
    updatedAt: Date;
}
