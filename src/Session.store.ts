import { observable } from 'mobx';
import { persist } from 'mobx-persist';
import { UserModel } from './Models/User/User.model';

class SessionStore {
  @persist @observable _user: string = '';

  isAuthenticated = (): boolean => {
    return !!this._user;
  };

  unauthenticate = () => {
    this._user = '';
  };

  getUser = (): UserModel => {
    return UserModel.findByID(this._user) ?? new UserModel();
  };
}

export default new SessionStore();
