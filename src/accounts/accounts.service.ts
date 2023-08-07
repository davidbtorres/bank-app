import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountDto } from './dto/account.dto';
import { AccountsRepository } from './accounts.repository';
import { TransactionDto } from './../transactions/dto/transaction.dto';
import { TransactionsRepository } from './../transactions/transactions.repository';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  findAll(): AccountDto[] {
    return this.accountsRepository.findAll();
  }

  findById(id: string): AccountDto {
    const account = this.accountsRepository.findById(id);

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found.`);
    }

    return account;
  }

  getAccountTransactions(id: string): TransactionDto[] {
    return this.transactionsRepository.findAllByAccountId(id);
  }

  createAccount(account: AccountDto): AccountDto {
    return this.accountsRepository.create(account);
  }

  addTransaction(
    accountId: string,
    transaction: TransactionDto,
  ): TransactionDto {
    // validate account
    const account = this.accountsRepository.findById(accountId);
    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found.`);
    }

    account.balance.amount += transaction.amount_money.amount;

    const newTransaction = this.transactionsRepository.createTransaction(
      accountId,
      transaction,
    );
    return newTransaction;
  }

  withdrawTransaction(
    accountId: string,
    transaction: TransactionDto,
  ): TransactionDto {
    // validate account
    const account = this.accountsRepository.findById(accountId);
    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found.`);
    }

    // validate account balance
    if (
      account.balance.amount === 0 ||
      account.balance.amount < transaction.amount_money.amount
    ) {
      throw new BadRequestException(
        'Insufficient balance to withdraw the funds.',
      );
    }

    account.balance.amount -= transaction.amount_money.amount;

    const newTransaction = this.transactionsRepository.createTransaction(
      accountId,
      transaction,
    );
    return newTransaction;
  }

  sendTransaction(
    accountId: string,
    transaction: TransactionDto,
  ): TransactionDto {
    // validate accounts
    const senderAccount = this.accountsRepository.findById(accountId);
    if (!senderAccount) {
      throw new NotFoundException(`Account with ID ${accountId} not found.`);
    }
    const targetAccount = this.accountsRepository.findById(
      transaction.target_account_id,
    );
    if (!targetAccount) {
      throw new NotFoundException(
        `Account with ID ${transaction.target_account_id} not found.`,
      );
    }
    // validate currency type (preventing cross currency transactions for now)
    if (transaction.amount_money.currency !== targetAccount.balance.currency) {
      throw new BadRequestException(
        `Invalid balance currency: cannot deposit ${transaction.amount_money.currency} into ${targetAccount.balance.currency} balance.`,
      );
    }
    // validate transaction amount
    if (
      transaction.amount_money.amount < 1 ||
      transaction.amount_money.amount > 1000
    ) {
      throw new BadRequestException(
        'Invalid balance amount: cannot send less than $1 or more than $1000.',
      );
    }
    // validate sender balance
    if (
      senderAccount.balance.amount === 0 ||
      senderAccount.balance.amount < transaction.amount_money.amount
    ) {
      throw new BadRequestException(
        'Insufficient balance to make the transfer.',
      );
    }

    senderAccount.balance.amount -= transaction.amount_money.amount;
    targetAccount.balance.amount += transaction.amount_money.amount;

    const newTransaction = this.transactionsRepository.createTransaction(
      accountId,
      transaction,
    );
    return newTransaction;
  }
}
