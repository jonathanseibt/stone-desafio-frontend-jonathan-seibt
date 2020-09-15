import { observable } from 'mobx';
import { persist } from 'mobx-persist';
import { UserModel } from './Models/User/User.model';

class SessionStore {
  @persist @observable email: string = '';

  isAuthenticated = (): boolean => {
    return !!this.email;
  };

  unauthenticate = () => {
    this.email = '';
  };

  getUser = (): UserModel => {
    return UserModel.findByEmail(this.email) ?? new UserModel();
  };
}

export default new SessionStore();
