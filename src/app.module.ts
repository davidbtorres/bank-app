import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsRepository } from './accounts/accounts.repository';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [AccountsModule],
  controllers: [AppController, AccountsController],
  providers: [AppService, AccountsRepository],
})
export class AppModule {}
