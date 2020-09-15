import { action } from 'mobx';
import BitcoinScheduler from '../../Scheduler/Bitcoin/Bitcoin.scheduler';
import BritaScheduler from '../../Scheduler/Brita/Brita.scheduler';

class Store {
  @action
  sync = async () => {
    await Promise.all([BitcoinScheduler.refresh(), BritaScheduler.refresh()]);
  };
}

export default new Store();
