import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Constants from '../Constants';
import { CryptoModel } from '../Models/Crypto/Crypto.model';

const DEFAULT_INTERVAL_IN_MILLISECONDS = 60000; // 1 minute

class BitcoinScheduler {
  static execute = (intervalInMilliseconds?: number) => {
    BitcoinScheduler.refresh();

    setInterval(
      () => {
        BitcoinScheduler.refresh();
      },
      intervalInMilliseconds ? intervalInMilliseconds : DEFAULT_INTERVAL_IN_MILLISECONDS,
    );
  };

  static refresh = async () => {
    let crypto = CryptoModel.findByAcronym(Constants.BITCOIN.acronym);

    if (!crypto) {
      crypto = new CryptoModel({
        id: uuid(),
        name: Constants.BITCOIN.name,
        acronym: Constants.BITCOIN.acronym,
        icon: Constants.BITCOIN.icon,
        backgroundStyle: Constants.BITCOIN.backgroundStyle,
        priceBuy: 0,
        lastPriceBuy: 0,
        priceSell: 0,
        lastPriceSell: 0,
      });
    }

    const api: any = (await axios('https://www.mercadobitcoin.net/api/BTC/ticker/')).data.ticker;

    crypto.lastPriceBuy = crypto.priceBuy;
    crypto.priceBuy = api.buy;

    crypto.lastPriceSell = crypto.priceSell;
    crypto.priceSell = api.sell;

    CryptoModel.updateByAcronym(Constants.BITCOIN.acronym, crypto);
  };
}

export default BitcoinScheduler;