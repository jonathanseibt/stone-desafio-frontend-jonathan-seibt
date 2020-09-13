import { action, observable } from 'mobx';

export type DataType = {
  coin: string;
  acronym: string;
  icon: string;
  balance: { quantity: number; value: number };
  background: string;
};

class Store {
  @observable balance = 75000;
  @observable cryptos = 25000;
  @observable data: DataType[] = [];

  @action
  load = () => {
    const fakeData: DataType[] = [
      {
        coin: 'Bitcoin',
        acronym: 'BTC',
        icon: 'bitcoin.png',
        balance: { quantity: 0.27, value: 14987.7 },
        background: 'linear-gradient(90deg, rgba(255,232,222,0.5) 0%, rgba(255,255,255,0.5) 50%)',
      },
      {
        coin: 'Brita',
        acronym: 'BRT',
        icon: 'brita.png',
        balance: { quantity: 0.27, value: 14987.7 },
        background: 'linear-gradient(90deg, rgba(223,247,242,0.5) 0%, rgba(255,255,255,0.5) 50%)',
      },
    ];

    this.data = fakeData;
  };
}

export default new Store();
