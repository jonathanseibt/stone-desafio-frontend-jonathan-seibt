import { action, observable } from 'mobx';
import { InputType } from '../../Components/Input/Input.type';
import { UserModel } from '../../Models/User/User.model';

class Store {
  @observable inputEmail: InputType = { value: '', helperText: '', error: false };

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

  @action
  recover = (): boolean | string => {
    const user = UserModel.findByEmail(this.inputEmail.value);

    if (!user) return false;

    return user.password;
  };
}

export default new Store();
