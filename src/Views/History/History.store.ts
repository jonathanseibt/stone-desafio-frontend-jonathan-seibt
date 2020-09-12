import { action, observable } from 'mobx';

export type DataType = {
  type: 'buy' | 'sell';
  coin: string;
  acronym: string;
  icon: string;
  price: number;
  quantity: number;
  balance: { quantity: number; value: number };
};

class Store {
  @observable data: DataType[] = [];

  @action
  load = () => {
    const fakeData: DataType[] = [
      {
        type: 'buy',
        coin: 'Bitcoin',
        acronym: 'BTC',
        icon: 'bitcoin.png',
        price: 55510.0058,
        quantity: 0.27,
        balance: { quantity: 0.27, value: 14987.7 },
      },
      {
        type: 'sell',
        coin: 'Brita',
        acronym: 'BRT',
        icon: 'brita.png',
        price: 55510.0058,
        quantity: 0.27,
        balance: { quantity: 0.27, value: 14987.7 },
      },
    ];

    this.data = fakeData;
  };
}

export default new Store();
