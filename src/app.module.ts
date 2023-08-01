import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsRepository } from './accounts/accounts.repository';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionsRepository } from './transactions/transactions.repository';

@Module({
  imports: [AccountsModule, TransactionsModule],
  controllers: [AppController, AccountsController, TransactionsController],
  providers: [AppService, AccountsRepository, TransactionsRepository],
})
export class AppModule {}
