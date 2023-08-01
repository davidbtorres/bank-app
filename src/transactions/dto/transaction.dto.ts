import { Amount_moneyDto } from './amount_money.dto';

export class TransactionDto {
  readonly id: string;
  readonly target_account_id: string;
  readonly note: string;
  readonly amount_money: Amount_moneyDto;
  readonly account_id: string;
}
