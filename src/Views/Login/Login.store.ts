import { action, observable } from 'mobx';
import { InputType } from '../../Components/Input/Input.type';
import Constants from '../../Constants';
import { UserModel } from '../../Models/User/User.model';
import SessionStore from '../../Session.store';

class Store {
  @observable inputEmail: InputType = { value: '', helperText: '', error: false };
  @observable inputPassword: InputType = { value: '', helperText: '', error: false };

  @action
  load = () => {
    this.clearInputEmail();
    this.clearInputPassword();
  };

  @action
  validateForm = (): boolean => {
    let success = true;

    if (!this.inputEmail.value) {
      this.inputEmail.helperText = Constants.MESSAGE_REQUIRED;
      this.inputEmail.error = true;

      success = false;
    }

    if (!this.inputPassword.value) {
      this.inputPassword.helperText = Constants.MESSAGE_REQUIRED;
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

  @action
  login = (): boolean => {
    const user = UserModel.findByEmailAndPassword(this.inputEmail.value, this.inputPassword.value);

    if (user) {
      SessionStore.email = user.email;

      return true;
    }

    return false;
  };
}

export default new Store();
