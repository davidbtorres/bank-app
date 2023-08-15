import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AccountsModule, TransactionsModule, DatabaseModule],
})
export class AppModule {}
