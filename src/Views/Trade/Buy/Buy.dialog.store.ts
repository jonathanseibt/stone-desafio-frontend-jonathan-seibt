import { action, observable } from 'mobx';
import { InputType } from '../../../Components/Input/Input.type';

class Store {
  @observable opened = false;
  @observable inputCurrentCurrency: InputType = { value: '', helperText: '', error: false };
  @observable inputCryptoCurrency: InputType = { value: '', helperText: '', error: false };

  @action
  load = () => {
    this.clearInputCurrentCurrency();
    this.clearInputCryptoCurrency();
  };

  @action
  open = () => {
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
  };
}

export default new Store();
