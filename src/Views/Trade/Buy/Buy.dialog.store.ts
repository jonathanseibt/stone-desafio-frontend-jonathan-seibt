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
  @observable inputCurrentCurrency: InputType = { value: '', helperText: '', error: false };
  @observable inputCryptoCurrency: InputType = { value: '', helperText: '', error: false };

  @action
  load = () => {
    this.clearInputCurrentCurrency();
    this.clearInputCryptoCurrency();

    this.inputCurrentCurrency.value = String(this.getUserWalletBalance);
    this.inputCryptoCurrency.value = String(Convert.realToCrypto(this.getCryptoPriceBuy, Number(this.inputCurrentCurrency.value)));
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

    if (!this.inputCurrentCurrency.value) {
      this.inputCurrentCurrency.helperText = Constants.MESSAGE_REQUIRED;
      this.inputCurrentCurrency.error = true;

      success = false;
    } else {
      if (Number(this.inputCurrentCurrency.value) <= 0) {
        this.inputCurrentCurrency.helperText = Constants.MESSAGE_GREATER_THAN_ZERO;
        this.inputCurrentCurrency.error = true;

        success = false;
      }
    }

    if (!this.inputCryptoCurrency.value) {
      this.inputCryptoCurrency.helperText = Constants.MESSAGE_REQUIRED;
      this.inputCryptoCurrency.error = true;

      success = false;
    } else {
      if (Number(this.inputCryptoCurrency.value) <= 0) {
        this.inputCryptoCurrency.helperText = Constants.MESSAGE_GREATER_THAN_ZERO;
        this.inputCryptoCurrency.error = true;

        success = false;
      }
    }

    if (success) {
      if (Number(this.inputCurrentCurrency.value) > this.getUserWalletBalance) {
        this.inputCurrentCurrency.helperText = Constants.MESSAGE_ABOVE_BALANCE;
        this.inputCurrentCurrency.error = true;

        success = false;
      }
    }

    return success;
  };

  @action
  clearInputCurrentCurrency = () => {
    this.inputCurrentCurrency.value = '';
    this.inputCurrentCurrency.helperText = '';
    this.inputCurrentCurrency.error = false;
  };

  @action
  onChangeInputCurrentCurrency = (value: string) => {
    this.clearInputCurrentCurrency();

    this.inputCurrentCurrency.value = value;

    this.inputCryptoCurrency.value = String(Convert.realToCrypto(this.getCryptoPriceBuy, Number(this.inputCurrentCurrency.value)));

    if (Number(this.inputCurrentCurrency.value) > this.getUserWalletBalance) {
      this.inputCurrentCurrency.helperText = Constants.MESSAGE_ABOVE_BALANCE;
      this.inputCurrentCurrency.error = true;
    }
  };

  @action
  clearInputCryptoCurrency = () => {
    this.inputCryptoCurrency.value = '';
    this.inputCryptoCurrency.helperText = '';
    this.inputCryptoCurrency.error = false;
  };

  @action
  onChangeInputCryptoCurrency = (value: string) => {
    this.clearInputCryptoCurrency();

    this.inputCryptoCurrency.value = value;

    this.inputCurrentCurrency.value = String(Convert.cryptoToReal(this.getCryptoPriceBuy, Number(this.inputCryptoCurrency.value)));

    if (Number(this.inputCurrentCurrency.value) > this.getUserWalletBalance) {
      this.inputCurrentCurrency.helperText = Constants.MESSAGE_ABOVE_BALANCE;
      this.inputCurrentCurrency.error = true;
    }
  };

  @action
  buy = () => {
    const user = SessionStore.getUser();

    const crypto = user.wallet.cryptos.find((crypto) => crypto.acronym === this.acronym);

    let balance = 0;

    if (crypto) {
      const index = user.wallet.cryptos.findIndex((crypto) => crypto.acronym === this.acronym);
      user.wallet.cryptos[index].quantity += Number(this.inputCryptoCurrency.value);

      balance = user.wallet.cryptos[index].quantity;
    } else {
      user.wallet.cryptos.push(
        new UserWalletCryptoModel({
          quantity: Number(this.inputCryptoCurrency.value),
          acronym: this.acronym,
        }),
      );

      balance = Number(this.inputCryptoCurrency.value);
    }

    user.wallet.balance -= Number(this.inputCurrentCurrency.value);

    user.wallet.history.push(
      new UserWalletHistoryModel({
        operation: UserWalletHistoryModel.OPERATION.BUY,
        date: new Date(),
        price: this.getCryptoPriceBuy,
        quantity: Number(this.inputCryptoCurrency.value),
        balance: balance,
        acronym: this.acronym,
      }),
    );

    UserModel.updateByEmail(user.email, user);
  };

  @computed get getCrypto(): CryptoModel {
    return CryptoModel.findByAcronym(this.acronym) ?? new CryptoModel();
  }

  @computed get getUserWalletBalance(): number {
    return SessionStore.getUser().wallet.balance ?? 0;
  }

  @computed get getUserWalletCryptoBalance(): number {
    return SessionStore.getUser().wallet.cryptos.find((crypto) => crypto.acronym === this.acronym)?.quantity ?? 0;
  }

  @computed get getCryptoPriceBuy(): number {
    return this.getCrypto.priceBuy ?? 0;
  }
}

export default new Store();
