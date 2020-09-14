import { action, observable } from 'mobx';
import { InputType } from '../../../Components/Input/Input.type';
import { CryptoModel } from '../../../Models/Crypto/Crypto.model';
import SessionStore from '../../../Session.store';
import Format from '../../../Utils/Format';

class Store {
  @observable _crypto = '';
  @observable opened = false;
  @observable inputCurrentCurrency: InputType = { value: '', helperText: '', error: false };
  @observable inputCryptoCurrency: InputType = { value: '', helperText: '', error: false };
  @observable inputCryptoCurrencyHelperText = '';

  @action
  load = () => {
    this.clearInputCurrentCurrency();
    this.clearInputCryptoCurrency();
  };

  @action
  open = (_crypto: string) => {
    this._crypto = _crypto;

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
    }

    if (!this.inputCryptoCurrency.value) {
      this.inputCryptoCurrency.helperText = 'É necessário informar o valor';
      this.inputCryptoCurrency.error = true;

      success = false;
    }

    if (success) {
      const balance = SessionStore.getUser().wallet.balance;

      if (Number(this.inputCurrentCurrency.value) > balance) {
        this.inputCurrentCurrency.error = true;
      }
    }

    return success;
  };

  @action
  clearInputCurrentCurrency = () => {
    this.inputCurrentCurrency.value = '';

    const balance = SessionStore.getUser().wallet.balance;

    this.inputCurrentCurrency.helperText = `Saldo disponível: ${Format.real(balance)}`;

    this.inputCurrentCurrency.error = false;
  };

  @action
  onChangeInputCurrentCurrency = (value: string) => {
    this.clearInputCurrentCurrency();
    this.inputCurrentCurrency.value = value;

    const quantity = Number(value) ?? 0;
    const priceBuy = CryptoModel.findByID(this._crypto)?.priceBuy ?? 0;

    this.inputCryptoCurrency.value = String(quantity / priceBuy);

    const balance = SessionStore.getUser().wallet.balance ?? 0;

    if (Number(this.inputCurrentCurrency.value) > balance) {
      this.inputCurrentCurrency.error = true;
    } else {
      this.inputCurrentCurrency.error = false;
    }
  };

  @action
  clearInputCryptoCurrency = () => {
    this.inputCryptoCurrency.value = '';

    const balance = SessionStore.getUser().wallet.cryptos.find((crypto) => (crypto._crypto = this._crypto))?.quantity ?? 0;
    const priceBuy = CryptoModel.findByID(this._crypto)?.priceBuy;

    this.inputCryptoCurrency.helperText = `Saldo atual: ${Format.decimal(balance, 8)}`;
    this.inputCryptoCurrencyHelperText = `Preço da unidade: ${Format.real(priceBuy)}`;

    this.inputCryptoCurrency.error = false;
  };

  @action
  onChangeInputCryptoCurrency = (value: string) => {
    this.clearInputCryptoCurrency();
    this.inputCryptoCurrency.value = value;

    const quantity = Number(value) ?? 0;
    const priceBuy = CryptoModel.findByID(this._crypto)?.priceBuy ?? 0;

    this.inputCurrentCurrency.value = String(quantity * priceBuy);

    const balance = SessionStore.getUser().wallet.balance ?? 0;

    if (Number(this.inputCurrentCurrency.value) > balance) {
      this.inputCurrentCurrency.error = true;
    } else {
      this.inputCurrentCurrency.error = false;
    }
  };
}

export default new Store();
