import { Productdetail } from "../../productdetail/entities/productdetail.entity";
import { Subscription } from "../../subscription/entities/subscription.entity";
export declare class Product {
    productid: number;
    name: string;
    salePrice: number;
    purchasePrice: number;
    productdetails: Productdetail[];
    subscriptions: Subscription[];
    createdAt: Date;
    updatedAt: Date;
}
