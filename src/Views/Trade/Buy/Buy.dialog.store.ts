import { action, computed, observable } from 'mobx';
import { InputType } from '../../../Components/Input/Input.type';
import { CryptoModel } from '../../../Models/Crypto/Crypto.model';
import SessionStore from '../../../Session.store';
import Convert from '../../../Utils/Convert';

class Store {
  @observable _crypto = '';
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
  buy = (): boolean => {
    return true;
  };

  @computed get getCrypto(): CryptoModel {
    return CryptoModel.findByID(this._crypto) ?? new CryptoModel();
  }

  @computed get getUserWalletBalance(): number {
    return SessionStore.getUser().wallet.balance ?? 0;
  }

  @computed get getUserWalletCryptoBalance(): number {
    return SessionStore.getUser().wallet.cryptos.find((crypto) => (crypto._crypto = this._crypto))?.quantity ?? 0;
  }

  @computed get getCryptoPriceBuy(): number {
    return this.getCrypto.priceBuy ?? 0;
  }
}

export default new Store();
