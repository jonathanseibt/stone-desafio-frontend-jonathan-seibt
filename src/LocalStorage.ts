import { action } from 'mobx';
import { create } from 'mobx-persist';
import BrowserStore from './Browser.store';
import SessionStore from './Session.store';

const hydrate = create({});

class LocalStorage {
  constructor() {
    this.load();
  }

  @action
  load = async () => {
    this.before();

    await Promise.all([hydrate('BrowserStore', BrowserStore), hydrate('SessionStore', SessionStore)]);

    this.after();
  };

  @action
  before = () => {
    BrowserStore.hydrated = false;
  };

  @action
  after = () => {
    BrowserStore.hydrated = true;
  };
}

export default new LocalStorage();
