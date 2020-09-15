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
}
