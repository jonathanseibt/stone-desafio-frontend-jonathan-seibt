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

  getBalance = () => {
    const crypto = CryptoModel.findByID(this._crypto);

    const price = crypto?.priceSell ?? 0;
    const quantity = this.quantity ?? 0;

    const balance = price * quantity;

    return balance;
  };

  getCrypto = () => {
    return CryptoModel.findByID(this._crypto) ?? new CryptoModel();
  };
}
