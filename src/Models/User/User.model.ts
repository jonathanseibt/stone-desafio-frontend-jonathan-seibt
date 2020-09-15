import BrowserStore from '../../Browser.store';
import { UserWalletModel } from './Wallet/UserWallet.model';

export class UserModel {
  id = '';
  name = '';
  email = '';
  password = '';
  wallet = new UserWalletModel();

  constructor(user?: UserModel) {
    if (!user) return;

    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.wallet = user.wallet;
  }

  static findByID = (id: string) => {
    return BrowserStore.users.find((user) => user.id === id);
  };

  static findByEmail = (email: string) => {
    return BrowserStore.users.find((user) => user.email === email);
  };

  static findByEmailAndPassword = (email: string, password: string) => {
    return BrowserStore.users.find((user) => user.email === email && user.password === password);
  };

  static updateByID = (id: string, user: UserModel) => {
    const index = BrowserStore.users.findIndex((_user) => _user.id === id);

    if (index >= 0) {
      BrowserStore.users.splice(index, 1, user);
    } else {
      BrowserStore.users.push(user);
    }
  };
}
