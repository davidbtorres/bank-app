import { Account } from './account.interface';

export class AccountsRepository {
  private accounts: Account[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];

  findAll(): Account[] {
    return this.accounts;
  }

  findById(id: number): Account {
    return this.accounts.find((account) => account.id === id);
  }

  create(account: Account): Account {
    const newAccount: Account = {
      id: this.generateNewId(),
      ...account,
    };
    this.accounts.push(newAccount);
    return newAccount;
  }

  private generateNewId(): number {
    // returns current existing max id + 1
    const existingIds = this.accounts.map((account) => account.id);
    return Math.max(...existingIds) + 1;
  }
}
