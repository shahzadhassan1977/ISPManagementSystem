import { Productdetail } from './entities/productdetail.entity';
import { Repository } from 'typeorm';
import { CreateProductdetailDto } from './dto/create-productdetail.dto';
import { UpdateProductdetailDto } from './dto/update-productdetail.dto';
export declare class ProductdetailService {
    private repo;
    constructor(repo: Repository<Productdetail>);
    create(dto: CreateProductdetailDto): Promise<Productdetail>;
    findAll(): Promise<Productdetail[]>;
    findOne(id: number): Promise<Productdetail | null>;
    update(id: number, dto: UpdateProductdetailDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findByProduct(productId: number): Promise<Productdetail[]>;
    findByCompany(companyid: number): Promise<Productdetail[]>;
}
