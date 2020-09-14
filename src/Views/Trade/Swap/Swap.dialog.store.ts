import { action, observable } from 'mobx';
import { InputType } from '../../../Components/Input/Input.type';
import Constants from '../../../Constants';
import { CryptoModel } from '../../../Models/Crypto/Crypto.model';
import SessionStore from '../../../Session.store';
import Format from '../../../Utils/Format';

class Store {
  @observable _crypto = '';
  @observable opened = false;
  @observable inputCryptoCurrencyBitcoin: InputType = { value: '', helperText: '', error: false };
  @observable inputCryptoCurrencyBitcoinHelperText = '';
  @observable inputCryptoCurrencyBrita: InputType = { value: '', helperText: '', error: false };
  @observable inputCryptoCurrencyBritaHelperText = '';

  @action
  load = () => {
    this.clearInputCryptoCurrencyBitcoin();
    this.clearInputCryptoCurrencyBrita();
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

    if (!this.inputCryptoCurrencyBitcoin.value) {
      this.inputCryptoCurrencyBitcoin.error = true;

      success = false;
    }

    if (!this.inputCryptoCurrencyBrita.value) {
      this.inputCryptoCurrencyBrita.error = true;

      success = false;
    }

    if (success) {
      const _bitcoin = CryptoModel.findByAcronym(Constants.BITCOIN.acronym) ?? new CryptoModel();
      const balanceBitcoin = SessionStore.getUser().wallet.cryptos.find((crypto) => (crypto._crypto = _bitcoin.id))?.quantity ?? 0;

      if (Number(this.inputCryptoCurrencyBitcoin.value) > balanceBitcoin) {
        this.inputCryptoCurrencyBitcoin.error = true;
      }

      const _brita = CryptoModel.findByAcronym(Constants.BRITA.acronym) ?? new CryptoModel();
      const balanceBrita = SessionStore.getUser().wallet.cryptos.find((crypto) => (crypto._crypto = _brita.id))?.quantity ?? 0;

      if (Number(this.inputCryptoCurrencyBrita.value) > balanceBrita) {
        this.inputCryptoCurrencyBrita.error = true;
      }
    }

    return success;
  };

  @action
  clearInputCryptoCurrencyBitcoin = () => {
    this.inputCryptoCurrencyBitcoin.value = '';

    const crypto = CryptoModel.findByAcronym(Constants.BITCOIN.acronym) ?? new CryptoModel();
    const balance = SessionStore.getUser().wallet.cryptos.find((crypto) => (crypto._crypto = crypto.id))?.quantity ?? 0;
    const value = crypto.id === this._crypto ? crypto.priceSell : crypto.priceBuy;

    this.inputCryptoCurrencyBitcoin.helperText = `Saldo ${crypto.id === this._crypto ? 'disponível' : 'atual'}: ${Format.decimal(balance, 8)}`;
    this.inputCryptoCurrencyBitcoinHelperText = `Preço de ${crypto.id === this._crypto ? 'venda' : 'compra'} da unidade: ${Format.real(value)}`;

    this.inputCryptoCurrencyBitcoin.error = false;
  };

  @action
  onChangeInputCryptoCurrencyBitcoin = (value: string) => {
    this.clearInputCryptoCurrencyBitcoin();
    this.inputCryptoCurrencyBitcoin.value = value;
  };

  @action
  clearInputCryptoCurrencyBrita = () => {
    this.inputCryptoCurrencyBrita.value = '';

    const crypto = CryptoModel.findByAcronym(Constants.BRITA.acronym) ?? new CryptoModel();
    const balance = SessionStore.getUser().wallet.cryptos.find((crypto) => (crypto._crypto = crypto.id))?.quantity ?? 0;
    const value = crypto.id === this._crypto ? crypto.priceSell : crypto.priceBuy;

    this.inputCryptoCurrencyBrita.helperText = `Saldo ${crypto.id === this._crypto ? 'disponível' : 'atual'}: ${Format.decimal(balance, 8)}`;
    this.inputCryptoCurrencyBritaHelperText = `Preço de ${crypto.id === this._crypto ? 'venda' : 'compra'} da unidade: ${Format.real(value)}`;

    this.inputCryptoCurrencyBrita.error = false;
  };

  @action
  onChangeInputCryptoCurrencyBrita = (value: string) => {
    this.clearInputCryptoCurrencyBrita();
    this.inputCryptoCurrencyBrita.value = value;
  };
}

export default new Store();
