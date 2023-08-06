import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { TransactionsRepository } from 'src/transactions/transactions.repository';
import { AccountDto } from './dto/account.dto';
import { TransactionDto } from 'src/transactions/dto/transaction.dto';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  @Get()
  findAll(): AccountDto[] {
    return this.accountsRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): AccountDto {
    const account = this.accountsRepository.findById(id);

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found.`);
    }

    return account;
  }

  @Get(':id/transactions')
  getAccountTransactions(@Param('id') id: string): TransactionDto[] {
    return this.transactionsRepository.findAllByAccountId(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // sets res status code to '201 Created' -> customary for successful account creation
  createAccount(@Body() account: AccountDto): AccountDto {
    // @body decorator is used to extract data from req body
    return this.accountsRepository.create(account);
  }

  @Post(':id/transactions/add')
  @HttpCode(HttpStatus.CREATED)
  addTransaction(
    @Param('id') accountId: string,
    @Body() transaction: TransactionDto,
  ): TransactionDto {
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

  @Post(':id/transactions/withdraw')
  @HttpCode(HttpStatus.CREATED)
  withdrawTransaction(
    @Param('id') accountId: string,
    @Body() transaction: TransactionDto,
  ): TransactionDto {
    const account = this.accountsRepository.findById(accountId);
    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found.`);
    }

    // validate sender balance
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

  @Post(':id/transactions/send')
  @HttpCode(HttpStatus.CREATED)
  sendTransaction(
    @Param('id') accountId: string,
    @Body() transaction: TransactionDto,
  ): TransactionDto {
    // ensure both accounts exist
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
