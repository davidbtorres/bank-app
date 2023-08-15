import { AmountMoneyDTO } from './amountMoney.dto';

export class TransactionDto {
  readonly id: string;
  readonly target_account_id?: string;
  readonly note: string;
  readonly amount_money: AmountMoneyDTO;
  readonly account_id: string;
}
