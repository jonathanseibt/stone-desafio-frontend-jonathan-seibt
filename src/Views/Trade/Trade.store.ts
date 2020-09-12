import { action, observable } from 'mobx';

export type DataType = {
  coin: string;
  acronym: string;
  icon: string;
  price: number;
  status: 'up' | 'down';
  balance: { quantity: number; value: number };
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
      },
      {
        coin: 'Brita',
        acronym: 'BRT',
        icon: 'brita.png',
        price: 55510.0058,
        status: 'down',
        balance: { quantity: 0.27, value: 14987.7 },
      },
    ];

    this.data = fakeData;
  };
}

export default new Store();
