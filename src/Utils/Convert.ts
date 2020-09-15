class Convert {
  static realToCrypto = (cryptoPrice?: number, valueInReal?: number): number => {
    cryptoPrice = cryptoPrice ? cryptoPrice : 0;
    valueInReal = valueInReal ? valueInReal : 0;

    return valueInReal / cryptoPrice;
  };

  static cryptoToReal = (cryptoPrice?: number, valueInCrypto?: number): number => {
    cryptoPrice = cryptoPrice ? cryptoPrice : 0;
    valueInCrypto = valueInCrypto ? valueInCrypto : 0;

    return valueInCrypto * cryptoPrice;
  };
}

export default Convert;
