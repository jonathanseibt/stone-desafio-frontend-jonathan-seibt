import { observable, action } from 'mobx';

class Store {
  @observable inputEmail = { value: '', helperText: '', error: false };

  @action
  load = () => {
    this.clearInputEmail();
  };

  @action
  validateForm = (): boolean => {
    let success = true;

    if (!this.inputEmail.value) {
      this.inputEmail.helperText = 'É necessário informar o seu e-mail';
      this.inputEmail.error = true;

      success = false;
    }

    return success;
  };

  @action
  clearInputEmail = () => {
    this.inputEmail.value = '';
    this.inputEmail.helperText = '';
    this.inputEmail.error = false;
  };

  @action
  onChangeInputEmail = (value: string) => {
    this.clearInputEmail();
    this.inputEmail.value = value;
  };
}

export default new Store();
