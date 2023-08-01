import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
  Body,
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
}
