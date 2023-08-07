import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AccountsRepository } from './accounts.repository';
import { TransactionsRepository } from 'src/transactions/transactions.repository';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository, TransactionsRepository],
})
export class AccountsModule {}
