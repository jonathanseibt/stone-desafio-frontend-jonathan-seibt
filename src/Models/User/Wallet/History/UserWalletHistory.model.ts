const BUY = 'buy';
const SELL = 'sell';

export class UserWalletHistoryModel {
  id = '';
  operation: typeof BUY | typeof SELL = BUY;
  date = new Date();
  price = 0;
  quantity = 0;
  balanceQuantity = 0;
  balanceValue = 0;
  _crypto = '';

  static OPERATION = { BUY: BUY as typeof BUY, SELL: SELL as typeof SELL };

  constructor(userWalletHistory?: UserWalletHistoryModel) {
    if (!userWalletHistory) return;

    this.id = userWalletHistory.id;
    this.operation = userWalletHistory.operation;
    this.date = userWalletHistory.date;
    this.price = userWalletHistory.price;
    this.quantity = userWalletHistory.quantity;
    this.balanceQuantity = userWalletHistory.balanceQuantity;
    this.balanceValue = userWalletHistory.balanceValue;
    this._crypto = userWalletHistory._crypto;
  }
}
