import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Constants from '../Constants';
import { CryptoModel } from '../Models/Crypto/Crypto.model';

const DEFAULT_INTERVAL_IN_MILLISECONDS = 60000; // 1 minute

class BritaScheduler {
  static execute = (intervalInMilliseconds?: number) => {
    BritaScheduler.refresh();

    setInterval(
      () => {
        BritaScheduler.refresh();
      },
      intervalInMilliseconds ? intervalInMilliseconds : DEFAULT_INTERVAL_IN_MILLISECONDS,
    );
  };

  static refresh = async () => {
    let crypto = CryptoModel.findByAcronym(Constants.BRITA.acronym);

    if (!crypto) {
      crypto = new CryptoModel({
        id: uuid(),
        name: Constants.BRITA.name,
        acronym: Constants.BRITA.acronym,
        icon: Constants.BRITA.icon,
        backgroundStyle: Constants.BRITA.backgroundStyle,
        priceBuy: 0,
        lastPriceBuy: 0,
        priceSell: 0,
        lastPriceSell: 0,
      });
    }

    const api: any = (await axios('https://economia.awesomeapi.com.br/json/all/USD/')).data.USD;

    crypto.lastPriceBuy = crypto.priceBuy;
    crypto.priceBuy = api.bid;

    crypto.lastPriceSell = crypto.priceSell;
    crypto.priceSell = api.ask;

    CryptoModel.updateByAcronym(Constants.BRITA.acronym, crypto);
  };
}

export default BritaScheduler;