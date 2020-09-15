import BitcoinScheduler from './Bitcoin/Bitcoin.scheduler';
import BritaScheduler from './Brita/Brita.scheduler';

const INTERVAL_IN_MILLISECONDS = 5000; // 5 seconds

class Scheduler {
  static execute = () => {
    BitcoinScheduler.execute(INTERVAL_IN_MILLISECONDS);
    BritaScheduler.execute(INTERVAL_IN_MILLISECONDS);
  };
}

export default Scheduler;
