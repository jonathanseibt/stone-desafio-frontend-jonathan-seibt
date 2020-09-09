import { observable, action } from 'mobx';
import { InputType } from '../../Components/Input/Input.type';

class Store {
  @observable inputName: InputType = { value: '', helperText: '', error: false };
  @observable inputEmail: InputType = { value: '', helperText: '', error: false };
  @observable inputPassword: InputType = { value: '', helperText: '', error: false };
  @observable inputConfirmPassword: InputType = { value: '', helperText: '', error: false };

  @action
  load = () => {
    this.clearInputName();
    this.clearInputEmail();
    this.clearInputPassword();
    this.clearInputConfirmPassword();
  };

  @action
  validateForm = (): boolean => {
    let success = true;

    if (!this.inputName.value) {
      this.inputName.helperText = 'É necessário informar o seu nome';
      this.inputName.error = true;

      success = false;
    }

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

    if (!this.inputConfirmPassword.value) {
      this.inputConfirmPassword.helperText = 'É necessário confirmar a sua senha';
      this.inputConfirmPassword.error = true;

      success = false;
    }

    return success;
  };

  @action
  clearInputName = () => {
    this.inputName.value = '';
    this.inputName.helperText = '';
    this.inputName.error = false;
  };

  @action
  onChangeInputName = (value: string) => {
    this.clearInputName();
    this.inputName.value = value;
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

  @action
  clearInputConfirmPassword = () => {
    this.inputConfirmPassword.value = '';
    this.inputConfirmPassword.helperText = '';
    this.inputConfirmPassword.error = false;
  };

  @action
  onChangeInputConfirmPassword = (value: string) => {
    this.clearInputConfirmPassword();
    this.inputConfirmPassword.value = value;
  };
}

export default new Store();
