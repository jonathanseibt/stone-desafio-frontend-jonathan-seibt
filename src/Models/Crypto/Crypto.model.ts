import BrowserStore from '../../Browser.store';

export class CryptoModel {
  name = '';
  acronym = '';
  icon = '';
  priceBuy = 0;
  lastPriceBuy = 0;
  priceSell = 0;
  lastPriceSell = 0;
  backgroundStyle = '';

  constructor(crypto?: CryptoModel) {
    if (!crypto) return;

    this.name = crypto.name;
    this.acronym = crypto.acronym;
    this.icon = crypto.icon;
    this.priceBuy = crypto.priceBuy;
    this.lastPriceBuy = crypto.lastPriceBuy;
    this.priceSell = crypto.priceSell;
    this.lastPriceSell = crypto.lastPriceSell;
    this.backgroundStyle = crypto.backgroundStyle;
  }

  static findByAcronym = (acronym: string) => {
    return BrowserStore.cryptos.find((crypto) => crypto.acronym === acronym);
  };

  static updateByAcronym = (acronym: string, crypto: CryptoModel) => {
    const index = BrowserStore.cryptos.findIndex((_crypto) => _crypto.acronym === acronym);

    if (index >= 0) {
      BrowserStore.cryptos.splice(index, 1, crypto);
    } else {
      BrowserStore.cryptos.push(crypto);
    }
  };
}
