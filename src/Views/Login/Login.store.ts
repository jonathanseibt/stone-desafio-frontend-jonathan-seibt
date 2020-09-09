import { observable, action } from 'mobx';

class Store {
  @observable inputEmail = { value: '', helperText: '', error: false };
  @observable inputPassword = { value: '', helperText: '', error: false };

  @action
  load = () => {
    this.clearInputEmail();
    this.clearInputPassword();
  };

  @action
  validateForm = (): boolean => {
    let success = true;

    if (!this.inputEmail.value) {
      this.inputEmail.helperText = 'É necessário informar o seu e-mail';
      this.inputEmail.error = true;

      success = false;
    }

    if (!this.inputPassword.value) {
      this.inputPassword.helperText = 'É necessário informar a sua senha';
      this.inputPassword.error = true;

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

  @action
  clearInputPassword = () => {
    this.inputPassword.value = '';
    this.inputPassword.helperText = '';
    this.inputPassword.error = false;
  };

  @action
  onChangeInputPassword = (value: string) => {
    this.clearInputPassword();
    this.inputPassword.value = value;
  };
}

export default new Store();
