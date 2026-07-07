import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesController {
    private service;
    constructor(service: ExpensesService);
    create(dto: CreateExpenseDto): Promise<import("./entities/expense.entity").Expense>;
    findAll(): Promise<import("./entities/expense.entity").Expense[]>;
    search(term: string): Promise<import("./entities/expense.entity").Expense[]>;
    findOne(id: number): Promise<import("./entities/expense.entity").Expense | null>;
    update(id: number, dto: UpdateExpenseDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
