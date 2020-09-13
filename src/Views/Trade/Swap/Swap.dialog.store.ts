import { action, observable } from 'mobx';
import { InputType } from '../../../Components/Input/Input.type';

class Store {
  @observable opened = false;
  @observable inputCryptoCurrencyFrom: InputType = { value: '', helperText: '', error: false };
  @observable inputCryptoCurrencyTo: InputType = { value: '', helperText: '', error: false };

  @action
  load = () => {
    this.clearInputCryptoCurrencyFrom();
    this.clearInputCryptoCurrencyTo();
  };

  @action
  open = () => {
    this.load();
    this.opened = true;
  };

  @action
  validateForm = (): boolean => {
    let success = true;

    if (!this.inputCryptoCurrencyFrom.value) {
      this.inputCryptoCurrencyFrom.helperText = 'É necessário informar o valor';
      this.inputCryptoCurrencyFrom.error = true;

      success = false;
    }

    if (!this.inputCryptoCurrencyTo.value) {
      this.inputCryptoCurrencyTo.helperText = 'É necessário informar o valor';
      this.inputCryptoCurrencyTo.error = true;

      success = false;
    }

    return success;
  };

  @action
  clearInputCryptoCurrencyFrom = () => {
    this.inputCryptoCurrencyFrom.value = '';
    this.inputCryptoCurrencyFrom.helperText = '';
    this.inputCryptoCurrencyFrom.error = false;
  };

  @action
  onChangeInputCryptoCurrencyFrom = (value: string) => {
    this.clearInputCryptoCurrencyFrom();
    this.inputCryptoCurrencyFrom.value = value;
  };

  @action
  clearInputCryptoCurrencyTo = () => {
    this.inputCryptoCurrencyTo.value = '';
    this.inputCryptoCurrencyTo.helperText = '';
    this.inputCryptoCurrencyTo.error = false;
  };

  @action
  onChangeInputCryptoCurrencyTo = (value: string) => {
    this.clearInputCryptoCurrencyTo();
    this.inputCryptoCurrencyTo.value = value;
  };
}

export default new Store();
