import BrowserStore from '../../Browser.store';

export class CryptoModel {
  id = '';
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

    this.id = crypto.id;
    this.name = crypto.name;
    this.acronym = crypto.acronym;
    this.icon = crypto.icon;
    this.priceBuy = crypto.priceBuy;
    this.lastPriceBuy = crypto.lastPriceBuy;
    this.priceSell = crypto.priceSell;
    this.lastPriceSell = crypto.lastPriceSell;
    this.backgroundStyle = crypto.backgroundStyle;
  }

  static findByID = (id: string) => {
    return BrowserStore.cryptos.find((crypto) => crypto.id === id);
  };

  static findByAcronym = (acronym: string) => {
    return BrowserStore.cryptos.find((crypto) => crypto.acronym === acronym);
  };

  static updateByAcronym = (acronym: string, crypto: CryptoModel) => {
    return BrowserStore.cryptos.splice(
      BrowserStore.cryptos.findIndex((crypto) => crypto.acronym === acronym),
      1,
      crypto,
    );
  };
}
