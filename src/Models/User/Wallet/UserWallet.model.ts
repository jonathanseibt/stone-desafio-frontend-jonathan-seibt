import { UserWalletCryptoModel } from './Crypto/UserWalletCrypto.model';
import { UserWalletHistoryModel } from './History/UserWalletHistory.model';

export class UserWalletModel {
  id = '';
  balance = 0;
  cryptos: UserWalletCryptoModel[] = [];
  history: UserWalletHistoryModel[] = [];

  constructor(userWallet?: UserWalletModel) {
    if (!userWallet) return;

    this.id = userWallet.id;
    this.balance = userWallet.balance;
    this.cryptos = userWallet.cryptos;
    this.history = userWallet.history;
  }

  static getCryptoBalance = (userWallet: UserWalletModel) => {
    let cryptoBalance = 0;

    for (const userWalletCrypto of userWallet.cryptos) {
      cryptoBalance += UserWalletCryptoModel.getBalance(userWalletCrypto);
    }

    return cryptoBalance;
  };
}
