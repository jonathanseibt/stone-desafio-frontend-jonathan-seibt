import { action, observable } from 'mobx';
import BrowserStore from '../../Browser.store';
import { InputType } from '../../Components/Input/Input.type';
import Constants from '../../Constants';
import { UserModel } from '../../Models/User/User.model';
import { UserWalletModel } from '../../Models/User/Wallet/UserWallet.model';

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
      this.inputName.helperText = Constants.MESSAGE_REQUIRED;
      this.inputName.error = true;

      success = false;
    }

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

    if (!this.inputConfirmPassword.value) {
      this.inputConfirmPassword.helperText = Constants.MESSAGE_REQUIRED;
      this.inputConfirmPassword.error = true;

      success = false;
    }

    if (success) {
      if (this.inputPassword.value !== this.inputConfirmPassword.value) {
        this.inputConfirmPassword.helperText = Constants.MESSAGE_WRONG_PASSWORD;
        this.inputConfirmPassword.error = true;

        success = false;
      }
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

  @action
  register = (): boolean => {
    const user = UserModel.findByEmail(this.inputEmail.value);

    if (user) {
      this.inputEmail.helperText = Constants.MESSAGE_EXISTENT_EMAIL;
      this.inputEmail.error = true;

      return false;
    }

    const newWallet = new UserWalletModel({
      balance: Constants.NEW_USERS_GIFT_BALANCE,
      cryptos: [],
      history: [],
    });

    const newUser = new UserModel({
      name: this.inputName.value,
      email: this.inputEmail.value,
      password: this.inputPassword.value,
      wallet: newWallet,
    });

    BrowserStore.users.push(newUser);

    return true;
  };
}

export default new Store();
