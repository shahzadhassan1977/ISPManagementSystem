import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private repo: Repository<Company>,
  ) {}

  create(dto: CreateCompanyDto) {
    const company = this.repo.create(dto);
    return this.repo.save(company);
  }

  findAll() {
    return this.repo.find({
      relations: ['employees'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { companyid:id },
      relations: ['employees'],
    });
  }

  update(id: number, dto: UpdateCompanyDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}