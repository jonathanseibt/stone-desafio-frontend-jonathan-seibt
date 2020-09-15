export class UserWalletCryptoModel {
  quantity = 0;
  acronym = '';

  constructor(userWalletCrypto?: UserWalletCryptoModel) {
    if (!userWalletCrypto) return;

    this.quantity = userWalletCrypto.quantity;
    this.acronym = userWalletCrypto.acronym;
  }
}
