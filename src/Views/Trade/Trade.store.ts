import { action, observable } from 'mobx';

export type DataType = {
  coin: string;
  acronym: string;
  icon: string;
  price: number;
  status: 'up' | 'down';
  balance: { quantity: number; value: number };
  background: string;
};

class Store {
  @observable data: DataType[] = [];

  @action
  load = () => {
    const fakeData: DataType[] = [
      {
        coin: 'Bitcoin',
        acronym: 'BTC',
        icon: 'bitcoin.png',
        price: 55510.0058,
        status: 'up',
        balance: { quantity: 0.27, value: 14987.7 },
        background: 'linear-gradient(90deg, rgba(255,232,222,0.5) 0%, rgba(255,255,255,0.5) 50%)',
      },
      {
        coin: 'Brita',
        acronym: 'BRT',
        icon: 'brita.png',
        price: 55510.0058,
        status: 'down',
        balance: { quantity: 0.27, value: 14987.7 },
        background: 'linear-gradient(90deg, rgba(223,247,242,0.5) 0%, rgba(255,255,255,0.5) 50%)',
      },
    ];

    this.data = fakeData;
  };
}

export default new Store();
