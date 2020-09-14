import { observable } from 'mobx';

class BrowserStore {
  @observable hydrated = false;
}

export default new BrowserStore();
