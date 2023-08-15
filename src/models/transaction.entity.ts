import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AmountMoneyDTO } from 'src/transactions/dto/amountMoney.dto';
import { Account } from './account.entity';

@Entity({ name: 'transaction', schema: 'bank' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //   @Column({ type: 'text' })
  //   target_account_id: string;

  @Column({ type: 'text' })
  note: string;

  @Column('jsonb')
  amount_money: AmountMoneyDTO;

  //   @Column('uuid')
  //   account_id: string;

  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @ManyToOne(() => Account, (account) => account.targetTransactions)
  @JoinColumn({ name: 'target_account_id' })
  targetAccount: Account;
}
