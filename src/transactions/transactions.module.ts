import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsController } from './transactions.controller';
import { Transaction } from 'src/models/transaction.entity';
import { Audit } from 'src/models/audit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Audit])],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository],
  exports: [TransactionsRepository],
})
export class TransactionsModule {}
