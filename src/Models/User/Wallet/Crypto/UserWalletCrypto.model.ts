export class UserWalletCryptoModel {
  balance = 0;
  acronym = '';

  constructor(userWalletCrypto?: UserWalletCryptoModel) {
    if (!userWalletCrypto) return;

    this.balance = userWalletCrypto.balance;
    this.acronym = userWalletCrypto.acronym;
  }
}
