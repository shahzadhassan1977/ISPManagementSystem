import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private repo: Repository<Expense>,
  ) {}

  create(dto: CreateExpenseDto) {
    const expense = this.repo.create({
      ...dto,
      expenseDate: new Date(dto.expenseDate),
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    });
    return this.repo.save(expense);
  }

  findAll() {
    return this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
    });
  }

  update(id: number, dto: UpdateExpenseDto) {
    return this.repo.update(id, {
      ...dto,
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  search(term: string) {
    const normalized = `%${term}%`;

    return this.repo
      .createQueryBuilder('expense')
      .where('expense.title LIKE :term', { term: normalized })
      .orWhere('expense.description LIKE :term', { term: normalized })
      .orWhere('expense.category LIKE :term', { term: normalized })
      .orWhere('expense.status LIKE :term', { term: normalized })
      .orderBy('expense.createdAt', 'DESC')
      .getMany();
  }
}
