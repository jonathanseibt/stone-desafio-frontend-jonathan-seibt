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
}
