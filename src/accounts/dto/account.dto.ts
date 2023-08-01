import { BalanceDto } from './balance.dto';

export class AccountDto {
  readonly id: string;
  readonly given_name: string;
  readonly family_name: string;
  readonly email_address: string;
  readonly note: string;
  readonly balance: BalanceDto;
}
