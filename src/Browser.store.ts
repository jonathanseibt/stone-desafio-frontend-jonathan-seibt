import { observable } from 'mobx';
import { persist } from 'mobx-persist';
import { UserModel } from './Models/User/User.model';

class BrowserStore {
  @observable hydrated = false;

  @persist('list') @observable users: UserModel[] = [];
}

export default new BrowserStore();
