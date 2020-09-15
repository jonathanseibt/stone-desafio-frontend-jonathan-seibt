import { action, computed, observable } from 'mobx';
import { InputType } from '../../../Components/Input/Input.type';
import Constants from '../../../Constants';
import { CryptoModel } from '../../../Models/Crypto/Crypto.model';
import { UserModel } from '../../../Models/User/User.model';
import { UserWalletCryptoModel } from '../../../Models/User/Wallet/Crypto/UserWalletCrypto.model';
import { UserWalletHistoryModel } from '../../../Models/User/Wallet/History/UserWalletHistory.model';
import SessionStore from '../../../Session.store';
import Convert from '../../../Utils/Convert';

class Store {
  @observable acronym = '';
  @observable opened = false;
  @observable inputCryptoCurrencyBitcoin: InputType = { value: '', helperText: '', error: false };
  @observable inputCryptoCurrencyBrita: InputType = { value: '', helperText: '', error: false };

  @action
  load = () => {
    this.clearInputCryptoCurrencyBitcoin();
    this.clearInputCryptoCurrencyBrita();

    if (this.isBitcoin) {
      this.inputCryptoCurrencyBitcoin.value = String(this.getUserWalletBitcoinBalance);

      const bitcoinToReal = Convert.cryptoToReal(this.getBitcoinPriceSell, Number(this.inputCryptoCurrencyBitcoin.value));
      const realToBrita = Convert.realToCrypto(this.getBritaPriceBuy, bitcoinToReal);

      this.inputCryptoCurrencyBrita.value = String(realToBrita);
    } else {
      this.inputCryptoCurrencyBrita.value = String(this.getUserWalletBritaBalance);

      const britaToReal = Convert.cryptoToReal(this.getBritaPriceSell, Number(this.inputCryptoCurrencyBrita.value));
      const realToBitcoin = Convert.realToCrypto(this.getBitcoinPriceBuy, britaToReal);

      this.inputCryptoCurrencyBitcoin.value = String(realToBitcoin);
    }
  };

  @action
  open = (acronym: string) => {
    this.acronym = acronym;

    this.load();

    this.opened = true;
  };

  @action
  validateForm = (): boolean => {
    let success = true;

    if (!this.inputCryptoCurrencyBitcoin.value) {
      this.inputCryptoCurrencyBitcoin.helperText = Constants.MESSAGE_REQUIRED;
      this.inputCryptoCurrencyBitcoin.error = true;

      success = false;
    } else {
      if (Number(this.inputCryptoCurrencyBitcoin.value) <= 0) {
        this.inputCryptoCurrencyBitcoin.helperText = Constants.MESSAGE_GREATER_THAN_ZERO;
        this.inputCryptoCurrencyBitcoin.error = true;

        success = false;
      }
    }

    if (!this.inputCryptoCurrencyBrita.value) {
      this.inputCryptoCurrencyBrita.helperText = Constants.MESSAGE_REQUIRED;
      this.inputCryptoCurrencyBrita.error = true;

      success = false;
    } else {
      if (Number(this.inputCryptoCurrencyBrita.value) <= 0) {
        this.inputCryptoCurrencyBrita.helperText = Constants.MESSAGE_GREATER_THAN_ZERO;
        this.inputCryptoCurrencyBrita.error = true;

        success = false;
      }
    }

    if (success) {
      if (this.isBitcoin) {
        if (Number(this.inputCryptoCurrencyBitcoin.value) > this.getUserWalletBitcoinBalance) {
          this.inputCryptoCurrencyBitcoin.helperText = Constants.MESSAGE_ABOVE_BALANCE;
          this.inputCryptoCurrencyBitcoin.error = true;

          success = false;
        }
      } else {
        if (Number(this.inputCryptoCurrencyBrita.value) > this.getUserWalletBritaBalance) {
          this.inputCryptoCurrencyBrita.helperText = Constants.MESSAGE_ABOVE_BALANCE;
          this.inputCryptoCurrencyBrita.error = true;

          success = false;
        }
      }
    }

    return success;
  };

  @action
  clearInputCryptoCurrencyBitcoin = () => {
    this.inputCryptoCurrencyBitcoin.value = '';
    this.inputCryptoCurrencyBitcoin.helperText = '';
    this.inputCryptoCurrencyBitcoin.error = false;
  };

  @action
  onChangeInputCryptoCurrencyBitcoin = (value: string) => {
    this.clearInputCryptoCurrencyBitcoin();

    this.inputCryptoCurrencyBitcoin.value = value;

    const bitcoinToReal = Convert.cryptoToReal(this.getBitcoinPriceSell, Number(this.inputCryptoCurrencyBitcoin.value));
    const realToBrita = Convert.realToCrypto(this.getBritaPriceBuy, bitcoinToReal);

    this.inputCryptoCurrencyBrita.value = String(realToBrita);

    if (this.isBitcoin) {
      if (Number(this.inputCryptoCurrencyBitcoin.value) > this.getUserWalletBitcoinBalance) {
        this.inputCryptoCurrencyBitcoin.helperText = Constants.MESSAGE_ABOVE_BALANCE;
        this.inputCryptoCurrencyBitcoin.error = true;
      }
    } else {
      if (Number(this.inputCryptoCurrencyBrita.value) > this.getUserWalletBritaBalance) {
        this.inputCryptoCurrencyBrita.helperText = Constants.MESSAGE_ABOVE_BALANCE;
        this.inputCryptoCurrencyBrita.error = true;
      }
    }
  };

  @action
  clearInputCryptoCurrencyBrita = () => {
    this.inputCryptoCurrencyBrita.value = '';
    this.inputCryptoCurrencyBrita.helperText = '';
    this.inputCryptoCurrencyBrita.error = false;
  };

  @action
  onChangeInputCryptoCurrencyBrita = (value: string) => {
    this.clearInputCryptoCurrencyBrita();

    this.inputCryptoCurrencyBrita.value = value;

    const britaToReal = Convert.cryptoToReal(this.getBritaPriceSell, Number(this.inputCryptoCurrencyBrita.value));
    const realToBitcoin = Convert.realToCrypto(this.getBitcoinPriceBuy, britaToReal);

    this.inputCryptoCurrencyBitcoin.value = String(realToBitcoin);

    if (this.isBitcoin) {
      if (Number(this.inputCryptoCurrencyBitcoin.value) > this.getUserWalletBitcoinBalance) {
        this.inputCryptoCurrencyBitcoin.helperText = Constants.MESSAGE_ABOVE_BALANCE;
        this.inputCryptoCurrencyBitcoin.error = true;
      }
    } else {
      if (Number(this.inputCryptoCurrencyBrita.value) > this.getUserWalletBritaBalance) {
        this.inputCryptoCurrencyBrita.helperText = Constants.MESSAGE_ABOVE_BALANCE;
        this.inputCryptoCurrencyBrita.error = true;
      }
    }
  };

  @action
  swap = () => {
    this.sell();
    this.buy();
  };

  @action
  sell = () => {
    const user = SessionStore.getUser();

    if (this.isBitcoin) {
      const index = user.wallet.cryptos.findIndex((crypto) => crypto.acronym === Constants.BITCOIN.acronym);
      user.wallet.cryptos[index].quantity -= Number(this.inputCryptoCurrencyBitcoin.value);

      const bitcoinToReal = Convert.cryptoToReal(this.getBitcoinPriceSell, Number(this.inputCryptoCurrencyBitcoin.value));

      user.wallet.balance += Number(bitcoinToReal);

      user.wallet.history.push(
        new UserWalletHistoryModel({
          operation: UserWalletHistoryModel.OPERATION.SELL,
          date: new Date(),
          price: this.getBitcoinPriceSell,
          quantity: Number(this.inputCryptoCurrencyBitcoin.value),
          balance: user.wallet.cryptos[index].quantity,
          acronym: Constants.BITCOIN.acronym,
        }),
      );
    } else {
      const index = user.wallet.cryptos.findIndex((crypto) => crypto.acronym === Constants.BRITA.acronym);
      user.wallet.cryptos[index].quantity -= Number(this.inputCryptoCurrencyBrita.value);

      const britaToReal = Convert.cryptoToReal(this.getBritaPriceSell, Number(this.inputCryptoCurrencyBrita.value));

      user.wallet.balance += Number(britaToReal);

      user.wallet.history.push(
        new UserWalletHistoryModel({
          operation: UserWalletHistoryModel.OPERATION.SELL,
          date: new Date(),
          price: this.getBritaPriceSell,
          quantity: Number(this.inputCryptoCurrencyBrita.value),
          balance: user.wallet.cryptos[index].quantity,
          acronym: Constants.BRITA.acronym,
        }),
      );
    }

    UserModel.updateByEmail(user.email, user);
  };

  @action
  buy = () => {
    const user = SessionStore.getUser();

    if (this.isBrita) {
      const crypto = user.wallet.cryptos.find((crypto) => crypto.acronym === Constants.BITCOIN.acronym);

      let balance = 0;

      if (crypto) {
        const index = user.wallet.cryptos.findIndex((crypto) => crypto.acronym === Constants.BITCOIN.acronym);
        user.wallet.cryptos[index].quantity += Number(this.inputCryptoCurrencyBitcoin.value);

        balance = user.wallet.cryptos[index].quantity;
      } else {
        user.wallet.cryptos.push(
          new UserWalletCryptoModel({
            quantity: Number(this.inputCryptoCurrencyBitcoin.value),
            acronym: Constants.BITCOIN.acronym,
          }),
        );

        balance = Number(this.inputCryptoCurrencyBitcoin.value);
      }

      const bitcoinToReal = Convert.cryptoToReal(this.getBitcoinPriceBuy, Number(this.inputCryptoCurrencyBitcoin.value));

      user.wallet.balance -= Number(bitcoinToReal);

      user.wallet.history.push(
        new UserWalletHistoryModel({
          operation: UserWalletHistoryModel.OPERATION.BUY,
          date: new Date(),
          price: this.getBitcoinPriceBuy,
          quantity: Number(this.inputCryptoCurrencyBitcoin.value),
          balance: balance,
          acronym: Constants.BITCOIN.acronym,
        }),
      );
    } else {
      const crypto = user.wallet.cryptos.find((crypto) => crypto.acronym === Constants.BRITA.acronym);

      let balance = 0;

      if (crypto) {
        const index = user.wallet.cryptos.findIndex((crypto) => crypto.acronym === Constants.BRITA.acronym);
        user.wallet.cryptos[index].quantity += Number(this.inputCryptoCurrencyBrita.value);

        balance = user.wallet.cryptos[index].quantity;
      } else {
        user.wallet.cryptos.push(
          new UserWalletCryptoModel({
            quantity: Number(this.inputCryptoCurrencyBrita.value),
            acronym: Constants.BRITA.acronym,
          }),
        );

        balance = Number(this.inputCryptoCurrencyBrita.value);
      }

      const britaToReal = Convert.cryptoToReal(this.getBritaPriceBuy, Number(this.inputCryptoCurrencyBrita.value));

      user.wallet.balance -= Number(britaToReal);

      user.wallet.history.push(
        new UserWalletHistoryModel({
          operation: UserWalletHistoryModel.OPERATION.BUY,
          date: new Date(),
          price: this.getBritaPriceBuy,
          quantity: Number(this.inputCryptoCurrencyBrita.value),
          balance: balance,
          acronym: Constants.BRITA.acronym,
        }),
      );
    }

    UserModel.updateByEmail(user.email, user);
  };

  @computed get getCrypto(): CryptoModel {
    return CryptoModel.findByAcronym(this.acronym) ?? new CryptoModel();
  }

  @computed get getBitcoin(): CryptoModel {
    return CryptoModel.findByAcronym(Constants.BITCOIN.acronym) ?? new CryptoModel();
  }

  @computed get getBrita(): CryptoModel {
    return CryptoModel.findByAcronym(Constants.BRITA.acronym) ?? new CryptoModel();
  }

  @computed get isBitcoin(): boolean {
    return this.getCrypto.acronym === Constants.BITCOIN.acronym;
  }

  @computed get isBrita(): boolean {
    return this.getCrypto.acronym === Constants.BRITA.acronym;
  }

  @computed get getUserWalletBitcoinBalance(): number {
    return SessionStore.getUser().wallet.cryptos.find((crypto) => crypto.acronym === this.getBitcoin.acronym)?.balance ?? 0;
  }

  @computed get getUserWalletBritaBalance(): number {
    return SessionStore.getUser().wallet.cryptos.find((crypto) => crypto.acronym === this.getBrita.acronym)?.balance ?? 0;
  }

  @computed get getBitcoinPriceBuy(): number {
    return this.getBitcoin.priceBuy ?? 0;
  }

  @computed get getBritaPriceBuy(): number {
    return this.getBrita.priceBuy ?? 0;
  }

  @computed get getBitcoinPriceSell(): number {
    return this.getBitcoin.priceSell ?? 0;
  }

  @computed get getBritaPriceSell(): number {
    return this.getBrita.priceSell ?? 0;
  }
}

export default new Store();
