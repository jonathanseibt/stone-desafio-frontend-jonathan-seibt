class Constants {
  static TITLE = 'E-Wallet';

  static PATH_IMAGES = '/assets/img';

  static NEW_USERS_GIFT_BALANCE = 100000;

  static MESSAGE_REQUIRED = 'Este campo é obrigatório';
  static MESSAGE_GREATER_THAN_ZERO = 'É necessário informar um valor maior que 0 (zero)';
  static MESSAGE_WRONG_PASSWORD = 'A senha não confere';
  static MESSAGE_EXISTENT_EMAIL = 'Este e-mail já está cadastrado';
  static MESSAGE_ABOVE_BALANCE = 'Valor acima do saldo disponível';

  static REAL = {
    name: 'Real',
    acronym: 'BRL',
    icon: 'real.png',
    backgroundStyle: 'linear-gradient(90deg, rgba(255,222,175,0.5) 0%, rgba(255,255,255,0.5) 50%)',
  };

  static BITCOIN = {
    name: 'Bitcoin',
    acronym: 'BTC',
    icon: 'bitcoin.png',
    backgroundStyle: 'linear-gradient(90deg, rgba(255,232,222,0.5) 0%, rgba(255,255,255,0.5) 50%)',
  };

  static BRITA = {
    name: 'Brita',
    acronym: 'BRT',
    icon: 'brita.png',
    backgroundStyle: 'linear-gradient(90deg, rgba(223,247,242,0.5) 0%, rgba(255,255,255,0.5) 50%)',
  };
}

export default Constants;
