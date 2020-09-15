import SessionStore from '../../../Session.store';
import Convert from '../../../Utils/Convert';
import { UserModel } from '../User.model';
import { UserWalletCryptoModel } from './Crypto/UserWalletCrypto.model';
import { UserWalletHistoryModel } from './History/UserWalletHistory.model';

export class UserWalletModel {
  balance = 0;
  cryptos: UserWalletCryptoModel[] = [];
  history: UserWalletHistoryModel[] = [];

  constructor(userWallet?: UserWalletModel) {
    if (!userWallet) return;

    this.balance = userWallet.balance;
    this.cryptos = userWallet.cryptos;
    this.history = userWallet.history;
  }

  static buy = (acronym: string, value: number, price: number) => {
    const user = SessionStore.getUser();

    value += user.wallet.cryptos.find((_crypto) => _crypto.acronym === acronym)?.balance ?? 0;

    user.wallet.cryptos = user.wallet.cryptos.filter((_crypto) => _crypto.acronym !== acronym);

    user.wallet.cryptos.push(
      new UserWalletCryptoModel({
        balance: value,
        acronym: acronym,
      }),
    );

    user.wallet.balance -= Convert.cryptoToReal(price, value);

    UserModel.updateByEmail(user.email, user);

    const balance = user.wallet.cryptos.find((_crypto) => _crypto.acronym === acronym)?.balance ?? 0;
    UserWalletHistoryModel.register(UserWalletHistoryModel.OPERATION.BUY, acronym, value, price, user.wallet.balance, balance);
  };

  static sell = (acronym: string, value: number, price: number) => {
    const user = SessionStore.getUser();

    const index = user.wallet.cryptos.findIndex((_crypto) => _crypto.acronym === acronym);
    user.wallet.cryptos[index].balance -= value;

    user.wallet.balance += Convert.cryptoToReal(price, value);

    UserModel.updateByEmail(user.email, user);

    const balance = user.wallet.cryptos.find((_crypto) => _crypto.acronym === acronym)?.balance ?? 0;
    UserWalletHistoryModel.register(UserWalletHistoryModel.OPERATION.SELL, acronym, value, price, user.wallet.balance, balance);
  };

  static swap = (acronymSell: string, valueSell: number, priceSell: number, acronymBuy: string, valueBuy: number, priceBuy: number) => {
    UserWalletModel.sell(acronymSell, valueSell, priceSell);
    UserWalletModel.buy(acronymBuy, valueBuy, priceBuy);
  };
}
