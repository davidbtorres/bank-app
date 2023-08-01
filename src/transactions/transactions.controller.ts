import { Controller, Get } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionsRepository } from './transactions.repository';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  @Get()
  findAll(): TransactionDto[] {
    return this.transactionsRepository.findAll();
  }
}
