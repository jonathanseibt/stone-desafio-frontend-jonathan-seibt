import { action, observable } from 'mobx';
import { InputType } from '../../../Components/Input/Input.type';
import { CryptoModel } from '../../../Models/Crypto/Crypto.model';
import SessionStore from '../../../Session.store';
import Format from '../../../Utils/Format';

class Store {
  @observable _crypto = '';
  @observable opened = false;
  @observable inputCryptoCurrency: InputType = { value: '', helperText: '', error: false };
  @observable inputCryptoCurrencyHelperText = '';
  @observable inputCurrentCurrency: InputType = { value: '', helperText: '', error: false };

  @action
  load = () => {
    this.clearInputCryptoCurrency();
    this.clearInputCurrentCurrency();
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

    if (!this.inputCryptoCurrency.value) {
      this.inputCryptoCurrency.error = true;

      success = false;
    }

    if (!this.inputCurrentCurrency.value) {
      this.inputCurrentCurrency.error = true;

      success = false;
    }

    if (success) {
      const balance = SessionStore.getUser().wallet.cryptos.find((crypto) => (crypto._crypto = this._crypto))?.quantity ?? 0;

      if (Number(this.inputCryptoCurrency.value) > balance) {
        this.inputCryptoCurrency.error = true;
      }
    }

    return success;
  };

  @action
  clearInputCryptoCurrency = () => {
    this.inputCryptoCurrency.value = '';

    const balance = SessionStore.getUser().wallet.cryptos.find((crypto) => (crypto._crypto = this._crypto))?.quantity ?? 0;
    const priceSell = CryptoModel.findByID(this._crypto)?.priceSell ?? 0;

    this.inputCryptoCurrency.helperText = `Saldo disponível: ${Format.decimal(balance, 8)}`;
    this.inputCryptoCurrencyHelperText = `Preço da unidade: ${Format.real(priceSell)}`;

    this.inputCryptoCurrency.error = false;
  };

  @action
  onChangeInputCryptoCurrency = (value: string) => {
    this.clearInputCryptoCurrency();
    this.inputCryptoCurrency.value = value;

    const quantity = Number(value) ?? 0;
    const priceSell = CryptoModel.findByID(this._crypto)?.priceSell ?? 0;

    this.inputCurrentCurrency.value = String(quantity * priceSell);

    const balance = SessionStore.getUser().wallet.cryptos.find((crypto) => (crypto._crypto = this._crypto))?.quantity ?? 0;

    if (Number(this.inputCryptoCurrency.value) > balance) {
      this.inputCryptoCurrency.error = true;
    } else {
      this.inputCryptoCurrency.error = false;
    }
  };

  @action
  clearInputCurrentCurrency = () => {
    this.inputCurrentCurrency.value = '';

    const balance = SessionStore.getUser().wallet.balance ?? 0;

    this.inputCurrentCurrency.helperText = `Saldo atual: ${Format.real(balance)}`;

    this.inputCurrentCurrency.error = false;
  };

  @action
  onChangeInputCurrentCurrency = (value: string) => {
    this.clearInputCurrentCurrency();
    this.inputCurrentCurrency.value = value;

    const quantity = Number(value) ?? 0;
    const priceSell = CryptoModel.findByID(this._crypto)?.priceSell ?? 0;

    this.inputCryptoCurrency.value = String(quantity / priceSell);

    const balance = SessionStore.getUser().wallet.cryptos.find((crypto) => (crypto._crypto = this._crypto))?.quantity ?? 0;

    if (Number(this.inputCryptoCurrency.value) > balance) {
      this.inputCryptoCurrency.error = true;
    } else {
      this.inputCryptoCurrency.error = false;
    }
  };
}

export default new Store();
