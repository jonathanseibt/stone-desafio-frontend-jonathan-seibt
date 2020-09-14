import { CryptoModel } from '../../../Crypto/Crypto.model';

export class UserWalletCryptoModel {
  id = '';
  quantity = 0;
  _crypto = '';

  constructor(userWalletCrypto?: UserWalletCryptoModel) {
    if (!userWalletCrypto) return;

    this.id = userWalletCrypto.id;
    this.quantity = userWalletCrypto.quantity;
    this._crypto = userWalletCrypto._crypto;
  }

  static getBalance = (userWalletCrypto: UserWalletCryptoModel) => {
    const crypto = CryptoModel.findByID(userWalletCrypto._crypto);

    const price = crypto?.priceSell ?? 0;
    const quantity = userWalletCrypto.quantity ?? 0;

    const balance = price * quantity;

    return balance;
  };
}
