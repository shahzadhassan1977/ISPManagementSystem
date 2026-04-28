import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompanyController {
    private service;
    constructor(service: CompanyService);
    create(dto: CreateCompanyDto): Promise<import("./entities/company.entity").Company>;
    findAll(): Promise<import("./entities/company.entity").Company[]>;
    findOne(id: number): Promise<import("./entities/company.entity").Company | null>;
    update(id: number, dto: UpdateCompanyDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
