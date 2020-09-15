import SessionStore from '../../../../Session.store';
import { UserModel } from '../../User.model';

const BUY = 'buy';
const SELL = 'sell';

export class UserWalletHistoryModel {
  operation: typeof BUY | typeof SELL = BUY;
  date = new Date();
  acronym = '';
  value = 0;
  price = 0;
  balanceWallet = 0;
  balanceCrypto = 0;

  static OPERATION = { BUY: BUY as typeof BUY, SELL: SELL as typeof SELL };

  constructor(userWalletHistory?: UserWalletHistoryModel) {
    if (!userWalletHistory) return;

    this.operation = userWalletHistory.operation;
    this.date = userWalletHistory.date;
    this.acronym = userWalletHistory.acronym;
    this.price = userWalletHistory.price;
    this.value = userWalletHistory.value;
    this.balanceWallet = userWalletHistory.balanceWallet;
    this.balanceCrypto = userWalletHistory.balanceCrypto;
  }

  static register = (operation: typeof BUY | typeof SELL, acronym: string, value: number, price: number, balanceWallet: number, balanceCrypto: number) => {
    const user = SessionStore.getUser();

    user.wallet.history.unshift(
      new UserWalletHistoryModel({
        operation: operation,
        date: new Date(),
        acronym: acronym,
        value: value,
        price: price,
        balanceWallet: balanceWallet,
        balanceCrypto: balanceCrypto,
      }),
    );

    UserModel.updateByEmail(user.email, user);
  };
}
