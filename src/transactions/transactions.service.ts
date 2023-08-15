import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  findAll(): TransactionDto[] {
    return this.transactionsRepository.findAll();
  }
}
