import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompanyService {
    private repo;
    constructor(repo: Repository<Company>);
    create(dto: CreateCompanyDto): Promise<Company>;
    findAll(): Promise<Company[]>;
    findOne(id: number): Promise<Company | null>;
    update(id: number, dto: UpdateCompanyDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
