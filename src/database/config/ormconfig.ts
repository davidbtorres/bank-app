import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Account } from './../../models/account.entity';
import { Transaction } from './../../models/transaction.entity';
import { Audit } from './../../models/audit.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'postgres',
  host: 'c_bank_db',
  port: 5432,
  username: 'apiuser',
  password: 'test',
  database: 'bank',
  entities: [Account, Transaction, Audit],
  subscribers: [],
  migrations: [__dirname + 'src/database/migrations/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  dropSchema: false,
};

export default new DataSource(config);
