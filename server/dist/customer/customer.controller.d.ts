import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerController {
    private service;
    constructor(service: CustomerService);
    create(dto: CreateCustomerDto): Promise<import("./entities/customer.entity").Customer>;
    findAll(): Promise<import("./entities/customer.entity").Customer[]>;
    findOne(id: number): Promise<import("./entities/customer.entity").Customer | null>;
    update(id: number, dto: UpdateCustomerDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    search(term: string): Promise<import("./entities/customer.entity").Customer[]>;
}
