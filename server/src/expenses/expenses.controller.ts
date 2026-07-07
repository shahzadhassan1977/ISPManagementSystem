import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private service: ExpensesService) {}

  @Post()
    create(@Body() dto: CreateExpenseDto) {
      console.log('Created Expense DTO:', dto); // Log the received DTO for debugging
      return this.service.create(dto);
    }
  
    @Get()
    findAll() {
      return this.service.findAll();
    }
  
    @Get('search')
  search(@Query('term') term: string) {
    return this.service.search(term ?? '');
  }

  @Get(':id')
    findOne(@Param('id') id: number) {
      return this.service.findOne(+id);
    }
  
    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateExpenseDto) {
      return this.service.update(+id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.service.remove(+id);
    }
}
