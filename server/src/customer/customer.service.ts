import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private repo: Repository<Customer>,
  ) {}

  create(dto: CreateCustomerDto) {
    const customer = this.repo.create(dto);
    return this.repo.save(customer);
  }

  findAll() {
    return this.repo.find({
      relations: ['subscriptions', 'payments'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { customerid:id },
      relations: ['subscriptions', 'payments'],
    });
  }

  update(id: number, dto: UpdateCustomerDto) {
    return this.repo.update({ customerid: id }, dto);
  }

  remove(id: number) {
    return this.repo.delete({ customerid: id });
  }

  search(term: string) {
    console.log('Searching for term:', term); // Debug log
  return this.repo
        .createQueryBuilder('customer')
        .where('customer.name LIKE :term', { term: `%${term}%` })
        .orWhere('customer.phone LIKE :term', { term: `%${term}%` })
        .orWhere('customer.cnic LIKE :term', { term: `%${term}%` })
        .getMany();
    }
}