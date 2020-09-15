import { action, computed, observable } from 'mobx';
import { InputType } from '../../../Components/Input/Input.type';
import Constants from '../../../Constants';
import { CryptoModel } from '../../../Models/Crypto/Crypto.model';
import SessionStore from '../../../Session.store';
import Convert from '../../../Utils/Convert';

class Store {
  @observable acronym = '';
  @observable opened = false;
  @observable inputCryptoCurrencyBitcoin: InputType = { value: '', helperText: '', error: false };
  @observable inputCryptoCurrencyBrita: InputType = { value: '', helperText: '', error: false };

  @action
  load = () => {
    this.clearInputCryptoCurrencyBitcoin();
    this.clearInputCryptoCurrencyBrita();

    if (this.isBitcoin) {
      this.inputCryptoCurrencyBitcoin.value = String(this.getUserWalletBitcoinBalance);

      const bitcoinToReal = Convert.cryptoToReal(this.getBitcoinPriceSell, Number(this.inputCryptoCurrencyBitcoin.value));
      const realToBrita = Convert.realToCrypto(this.getBritaPriceBuy, bitcoinToReal);

      this.inputCryptoCurrencyBrita.value = String(realToBrita);
    } else {
      this.inputCryptoCurrencyBrita.value = String(this.getUserWalletBritaBalance);

      const britaToReal = Convert.cryptoToReal(this.getBritaPriceSell, Number(this.inputCryptoCurrencyBrita.value));
      const realToBitcoin = Convert.realToCrypto(this.getBitcoinPriceBuy, britaToReal);

      this.inputCryptoCurrencyBitcoin.value = String(realToBitcoin);
    }
  };

  @action
  open = (acronym: string) => {
    this.acronym = acronym;

    this.load();

    this.opened = true;
  };

  @action
  validateForm = (): boolean => {
    let success = true;

    if (!this.inputCryptoCurrencyBitcoin.value) {
      this.inputCryptoCurrencyBitcoin.helperText = 'É necessário informar o valor';
      this.inputCryptoCurrencyBitcoin.error = true;

      success = false;
    } else {
      if (Number(this.inputCryptoCurrencyBitcoin.value) <= 0) {
        this.inputCryptoCurrencyBitcoin.helperText = 'É necessário informar um valor maior que 0 (zero)';
        this.inputCryptoCurrencyBitcoin.error = true;

        success = false;
      }
    }

    if (!this.inputCryptoCurrencyBrita.value) {
      this.inputCryptoCurrencyBrita.helperText = 'É necessário informar o valor';
      this.inputCryptoCurrencyBrita.error = true;

      success = false;
    } else {
      if (Number(this.inputCryptoCurrencyBrita.value) <= 0) {
        this.inputCryptoCurrencyBrita.helperText = 'É necessário informar um valor maior que 0 (zero)';
        this.inputCryptoCurrencyBrita.error = true;

        success = false;
      }
    }

    if (success) {
      if (this.isBitcoin) {
        if (Number(this.inputCryptoCurrencyBitcoin.value) > this.getUserWalletBitcoinBalance) {
          this.inputCryptoCurrencyBitcoin.helperText = 'Valor acima do saldo disponível';
          this.inputCryptoCurrencyBitcoin.error = true;

          success = false;
        }
      } else {
        if (Number(this.inputCryptoCurrencyBrita.value) > this.getUserWalletBritaBalance) {
          this.inputCryptoCurrencyBrita.helperText = 'Valor acima do saldo disponível';
          this.inputCryptoCurrencyBrita.error = true;

          success = false;
        }
      }
    }

    return success;
  };

  @action
  clearInputCryptoCurrencyBitcoin = () => {
    this.inputCryptoCurrencyBitcoin.value = '';
    this.inputCryptoCurrencyBitcoin.helperText = '';
    this.inputCryptoCurrencyBitcoin.error = false;
  };

  @action
  onChangeInputCryptoCurrencyBitcoin = (value: string) => {
    this.clearInputCryptoCurrencyBitcoin();

    this.inputCryptoCurrencyBitcoin.value = value;

    const bitcoinToReal = Convert.cryptoToReal(this.getBitcoinPriceSell, Number(this.inputCryptoCurrencyBitcoin.value));
    const realToBrita = Convert.realToCrypto(this.getBritaPriceBuy, bitcoinToReal);

    this.inputCryptoCurrencyBrita.value = String(realToBrita);

    if (this.isBitcoin) {
      if (Number(this.inputCryptoCurrencyBitcoin.value) > this.getUserWalletBitcoinBalance) {
        this.inputCryptoCurrencyBitcoin.helperText = 'Valor acima do saldo disponível';
        this.inputCryptoCurrencyBitcoin.error = true;
      }
    } else {
      if (Number(this.inputCryptoCurrencyBrita.value) > this.getUserWalletBritaBalance) {
        this.inputCryptoCurrencyBrita.helperText = 'Valor acima do saldo disponível';
        this.inputCryptoCurrencyBrita.error = true;
      }
    }
  };

  @action
  clearInputCryptoCurrencyBrita = () => {
    this.inputCryptoCurrencyBrita.value = '';
    this.inputCryptoCurrencyBrita.helperText = '';
    this.inputCryptoCurrencyBrita.error = false;
  };

  @action
  onChangeInputCryptoCurrencyBrita = (value: string) => {
    this.clearInputCryptoCurrencyBrita();

    this.inputCryptoCurrencyBrita.value = value;

    const britaToReal = Convert.cryptoToReal(this.getBritaPriceSell, Number(this.inputCryptoCurrencyBrita.value));
    const realToBitcoin = Convert.realToCrypto(this.getBitcoinPriceBuy, britaToReal);

    this.inputCryptoCurrencyBitcoin.value = String(realToBitcoin);

    if (this.isBitcoin) {
      if (Number(this.inputCryptoCurrencyBitcoin.value) > this.getUserWalletBitcoinBalance) {
        this.inputCryptoCurrencyBitcoin.helperText = 'Valor acima do saldo disponível';
        this.inputCryptoCurrencyBitcoin.error = true;
      }
    } else {
      if (Number(this.inputCryptoCurrencyBrita.value) > this.getUserWalletBritaBalance) {
        this.inputCryptoCurrencyBrita.helperText = 'Valor acima do saldo disponível';
        this.inputCryptoCurrencyBrita.error = true;
      }
    }
  };

  @action
  swap = (): boolean => {
    return true;
  };

  @computed get getCrypto(): CryptoModel {
    return CryptoModel.findByAcronym(this.acronym) ?? new CryptoModel();
  }

  @computed get getBitcoin(): CryptoModel {
    return CryptoModel.findByAcronym(Constants.BITCOIN.acronym) ?? new CryptoModel();
  }

  @computed get getBrita(): CryptoModel {
    return CryptoModel.findByAcronym(Constants.BRITA.acronym) ?? new CryptoModel();
  }

  @computed get isBitcoin(): boolean {
    return this.getCrypto.acronym === Constants.BITCOIN.acronym;
  }

  @computed get isBrita(): boolean {
    return this.getCrypto.acronym === Constants.BRITA.acronym;
  }

  @computed get getUserWalletBitcoinBalance(): number {
    return SessionStore.getUser().wallet.cryptos.find((crypto) => crypto.acronym === this.getBitcoin.acronym)?.quantity ?? 0;
  }

  @computed get getUserWalletBritaBalance(): number {
    return SessionStore.getUser().wallet.cryptos.find((crypto) => crypto.acronym === this.getBrita.acronym)?.quantity ?? 0;
  }

  @computed get getBitcoinPriceBuy(): number {
    return this.getBitcoin.priceBuy ?? 0;
  }

  @computed get getBritaPriceBuy(): number {
    return this.getBrita.priceBuy ?? 0;
  }

  @computed get getBitcoinPriceSell(): number {
    return this.getBitcoin.priceSell ?? 0;
  }

  @computed get getBritaPriceSell(): number {
    return this.getBrita.priceSell ?? 0;
  }
}

export default new Store();
