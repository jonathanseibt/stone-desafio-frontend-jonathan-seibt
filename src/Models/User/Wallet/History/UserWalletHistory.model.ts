const BUY = 'buy';
const SELL = 'sell';

export class UserWalletHistoryModel {
  operation: typeof BUY | typeof SELL = BUY;
  date = new Date();
  price = 0;
  quantity = 0;
  balance = 0;
  acronym = '';

  static OPERATION = { BUY: BUY as typeof BUY, SELL: SELL as typeof SELL };

  constructor(userWalletHistory?: UserWalletHistoryModel) {
    if (!userWalletHistory) return;

    this.operation = userWalletHistory.operation;
    this.date = userWalletHistory.date;
    this.price = userWalletHistory.price;
    this.quantity = userWalletHistory.quantity;
    this.balance = userWalletHistory.balance;
    this.acronym = userWalletHistory.acronym;
  }
}
