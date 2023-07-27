import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  NotFoundException,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { Account } from './account.interface';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  @Get()
  findAll(): Account[] {
    return this.accountsRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Account {
    const account = this.accountsRepository.findById(id);

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found.`);
    }

    return account;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // sets res status code to '201 Created' -> customary for successful account creation
  createAccount(@Body() account: Account): Account {
    // @body decorator is used to extract data from req body
    return this.accountsRepository.create(account);
  }
}
