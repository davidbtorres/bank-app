import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  Transaction,
} from 'typeorm';
import { Account } from './account.entity';

@Entity({ name: 'audit', schema: 'audit' })
export class Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  entity: 'Transaction' | 'Account';

  @Column()
  action: 'CREATE' | 'UPDATE' | 'DELETE';

  @Column('jsonb')
  new_value: Account | Transaction;

  @Column('timestamp')
  modified_at: Timestamp;
}
