import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from './transaction.entity';
import { BalanceDto } from './../accounts/dto/balance.dto';

@Entity({ name: 'account', schema: 'bank' })
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  given_name: string;

  @Column('text')
  family_name: string;

  @Column('text')
  email_address: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column('jsonb')
  balance: BalanceDto;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.targetAccount)
  targetTransactions: Transaction[];
}
