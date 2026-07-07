import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
export declare class ExpensesService {
    private repo;
    constructor(repo: Repository<Expense>);
    create(dto: CreateExpenseDto): Promise<Expense>;
    findAll(): Promise<Expense[]>;
    findOne(id: number): Promise<Expense | null>;
    update(id: number, dto: UpdateExpenseDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    search(term: string): Promise<Expense[]>;
}
