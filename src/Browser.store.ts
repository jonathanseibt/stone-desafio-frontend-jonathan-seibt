import { observable } from 'mobx';
import { persist } from 'mobx-persist';
import { CryptoModel } from './Models/Crypto/Crypto.model';
import { UserModel } from './Models/User/User.model';

class BrowserStore {
  @observable hydrated = false;

  @persist('list') @observable users: UserModel[] = [];
  @persist('list') @observable cryptos: CryptoModel[] = [];
}

export default new BrowserStore();
