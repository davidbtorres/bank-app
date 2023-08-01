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
import { AccountDto } from './dto/account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsRepository: AccountsRepository) {}

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

  @Post()
  @HttpCode(HttpStatus.CREATED) // sets res status code to '201 Created' -> customary for successful account creation
  createAccount(@Body() account: AccountDto): AccountDto {
    // @body decorator is used to extract data from req body
    return this.accountsRepository.create(account);
  }
}
