import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';

@Module({

  imports: [
      TypeOrmModule.forFeature([Expense])
    ],
    providers: [
      ExpensesService
    ],
    controllers: [
      ExpensesController
    ],
    exports:[
      ExpensesService,
      TypeOrmModule
    ]
})
export class ExpensesModule {

}
