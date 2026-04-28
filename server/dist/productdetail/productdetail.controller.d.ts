import { ProductdetailService } from './productdetail.service';
import { CreateProductdetailDto } from './dto/create-productdetail.dto';
import { UpdateProductdetailDto } from './dto/update-productdetail.dto';
export declare class ProductdetailController {
    private service;
    constructor(service: ProductdetailService);
    create(dto: CreateProductdetailDto): Promise<import("./entities/productdetail.entity").Productdetail>;
    findAll(): Promise<import("./entities/productdetail.entity").Productdetail[]>;
    findOne(id: number): Promise<import("./entities/productdetail.entity").Productdetail | null>;
    update(id: number, dto: UpdateProductdetailDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findByProduct(productId: number): Promise<import("./entities/productdetail.entity").Productdetail[]>;
}
