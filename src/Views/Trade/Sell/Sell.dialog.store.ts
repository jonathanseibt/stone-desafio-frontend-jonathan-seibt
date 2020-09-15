import { action, computed, observable } from 'mobx';
import { InputType } from '../../../Components/Input/Input.type';
import { CryptoModel } from '../../../Models/Crypto/Crypto.model';
import { UserModel } from '../../../Models/User/User.model';
import SessionStore from '../../../Session.store';
import Convert from '../../../Utils/Convert';

class Store {
  @observable acronym = '';
  @observable opened = false;
  @observable inputCryptoCurrency: InputType = { value: '', helperText: '', error: false };
  @observable inputCurrentCurrency: InputType = { value: '', helperText: '', error: false };

  @action
  load = () => {
    this.clearInputCryptoCurrency();
    this.clearInputCurrentCurrency();

    this.inputCryptoCurrency.value = String(this.getUserWalletCryptoBalance);
    this.inputCurrentCurrency.value = String(Convert.cryptoToReal(this.getCryptoPriceSell, Number(this.inputCryptoCurrency.value)));
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

    if (success) {
      if (Number(this.inputCryptoCurrency.value) > this.getUserWalletCryptoBalance) {
        this.inputCryptoCurrency.helperText = 'Valor acima do saldo disponível';
        this.inputCryptoCurrency.error = true;

        success = false;
      }
    }

    return success;
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

    this.inputCurrentCurrency.value = String(Convert.cryptoToReal(this.getCryptoPriceSell, Number(this.inputCryptoCurrency.value)));

    if (Number(this.inputCryptoCurrency.value) > this.getUserWalletCryptoBalance) {
      this.inputCryptoCurrency.helperText = 'Valor acima do saldo disponível';
      this.inputCryptoCurrency.error = true;
    }
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

    this.inputCryptoCurrency.value = String(Convert.realToCrypto(this.getCryptoPriceSell, Number(this.inputCurrentCurrency.value)));

    if (Number(this.inputCryptoCurrency.value) > this.getUserWalletCryptoBalance) {
      this.inputCryptoCurrency.helperText = 'Valor acima do saldo disponível';
      this.inputCryptoCurrency.error = true;
    }
  };

  @action
  sell = () => {
    const user = SessionStore.getUser();

    const index = user.wallet.cryptos.findIndex((crypto) => crypto.acronym === this.acronym);
    user.wallet.cryptos[index].quantity -= Number(this.inputCryptoCurrency.value);

    user.wallet.balance += Number(this.inputCurrentCurrency.value);

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

  @computed get getCryptoPriceSell(): number {
    return this.getCrypto.priceSell ?? 0;
  }
}

export default new Store();
