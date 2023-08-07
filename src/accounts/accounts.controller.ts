import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  Body,
} from '@nestjs/common';
import { AccountDto } from './dto/account.dto';
import { TransactionDto } from './../transactions/dto/transaction.dto';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  findAll(): AccountDto[] {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): AccountDto {
    return this.accountsService.findById(id);
  }

  @Get(':id/transactions')
  getAccountTransactions(@Param('id') id: string): TransactionDto[] {
    return this.accountsService.getAccountTransactions(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // sets res status code to '201 Created' -> customary for successful account creation
  createAccount(@Body() account: AccountDto): AccountDto {
    // @body decorator is used to extract data from req body
    return this.accountsService.createAccount(account);
  }

  @Post(':id/transactions/add')
  @HttpCode(HttpStatus.CREATED)
  addTransaction(
    @Param('id') accountId: string,
    @Body() transaction: TransactionDto,
  ): TransactionDto {
    return this.accountsService.addTransaction(accountId, transaction);
  }

  @Post(':id/transactions/withdraw')
  @HttpCode(HttpStatus.CREATED)
  withdrawTransaction(
    @Param('id') accountId: string,
    @Body() transaction: TransactionDto,
  ): TransactionDto {
    return this.accountsService.withdrawTransaction(accountId, transaction);
  }

  @Post(':id/transactions/send')
  @HttpCode(HttpStatus.CREATED)
  sendTransaction(
    @Param('id') accountId: string,
    @Body() transaction: TransactionDto,
  ): TransactionDto {
    return this.accountsService.sendTransaction(accountId, transaction);
  }
}
