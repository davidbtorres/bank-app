import { generateUUID } from 'src/uuid.helper';
import { AccountDto } from './dto/account.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsRepository {
  private accounts: AccountDto[] = [
    {
      id: generateUUID(),
      given_name: 'John',
      family_name: 'Doe',
      email_address: 'jdoe@mail.com',
      note: '',
      balance: { amount: 100, currency: 'USD' },
    },
    {
      id: generateUUID(),
      given_name: 'Jane',
      family_name: 'Smith',
      email_address: 'jsmithe@mail.com',
      note: '',
      balance: { amount: 200, currency: 'USD' },
    },
  ];

  findAll(): AccountDto[] {
    return this.accounts;
  }

  findById(id: string): AccountDto {
    return this.accounts.find((account) => account.id === id);
  }

  create(account: AccountDto): AccountDto {
    const newAccount: AccountDto = {
      id: generateUUID(),
      ...account,
    };
    this.accounts.push(newAccount);
    return newAccount;
  }
}
