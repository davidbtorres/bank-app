import { Injectable } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionsRepository {
  private transactions: TransactionDto[] = [
    {
      id: '1',
      target_account_id: 'ruhroh',
      note: 'string',
      amount_money: {
        amount: 123,
        currency: 'USD',
      },
      account_id: 'string',
    },
  ];

  findAll(): TransactionDto[] {
    return this.transactions;
  }

  findAllByAccountId(accountId: string): TransactionDto[] {
    return this.transactions.filter(
      (transactions) => transactions.account_id === accountId,
    );
  }

  createTransaction(
    accountId: string,
    transaction: TransactionDto,
  ): TransactionDto {
    const newTransaction: TransactionDto = {
      ...transaction,
      account_id: accountId,
    };
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}
