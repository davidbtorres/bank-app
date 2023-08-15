import { Controller, Get } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(): TransactionDto[] {
    return this.transactionsService.findAll();
  }
}
