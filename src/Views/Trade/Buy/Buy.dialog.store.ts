import { action, computed, observable } from 'mobx';
import { InputType } from '../../../Components/Input/Input.type';
import { CryptoModel } from '../../../Models/Crypto/Crypto.model';
import { UserModel } from '../../../Models/User/User.model';
import { UserWalletCryptoModel } from '../../../Models/User/Wallet/Crypto/UserWalletCrypto.model';
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
      this.inputCurrentCurrency.helperText = 'É necessário informar o valor';
      this.inputCurrentCurrency.error = true;

      success = false;
    } else {
      if (Number(this.inputCurrentCurrency.value) <= 0) {
        this.inputCurrentCurrency.helperText = 'É necessário informar um valor maior que 0 (zero)';
        this.inputCurrentCurrency.error = true;

        success = false;
      }
    }

    if (!this.inputCryptoCurrency.value) {
      this.inputCryptoCurrency.helperText = 'É necessário informar o valor';
      this.inputCryptoCurrency.error = true;

      success = false;
    } else {
      if (Number(this.inputCryptoCurrency.value) <= 0) {
        this.inputCryptoCurrency.helperText = 'É necessário informar um valor maior que 0 (zero)';
        this.inputCryptoCurrency.error = true;

        success = false;
      }
    }

    if (success) {
      if (Number(this.inputCurrentCurrency.value) > this.getUserWalletBalance) {
        this.inputCurrentCurrency.helperText = 'Valor acima do saldo disponível';
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
      this.inputCurrentCurrency.helperText = 'Valor acima do saldo disponível';
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
      this.inputCurrentCurrency.helperText = 'Valor acima do saldo disponível';
      this.inputCurrentCurrency.error = true;
    }
  };

  @action
  buy = () => {
    const user = SessionStore.getUser();

    const crypto = user.wallet.cryptos.find((crypto) => crypto.acronym === this.acronym);

    if (crypto) {
      const index = user.wallet.cryptos.findIndex((crypto) => crypto.acronym === this.acronym);
      user.wallet.cryptos[index].quantity += Number(this.inputCryptoCurrency.value);
    } else {
      user.wallet.cryptos.push(
        new UserWalletCryptoModel({
          quantity: Number(this.inputCryptoCurrency.value),
          acronym: this.acronym,
        }),
      );
    }

    user.wallet.balance -= Number(this.inputCurrentCurrency.value);

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
