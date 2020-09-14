import BitcoinScheduler from './Bitcoin.scheduler';

const INTERVAL_IN_MILLISECONDS = 5000; // 5 seconds

class Scheduler {
  static execute = () => {
    BitcoinScheduler.execute(INTERVAL_IN_MILLISECONDS);
  };
}

export default Scheduler;
