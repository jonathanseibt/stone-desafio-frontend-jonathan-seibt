class Format {
  static LOCALE = 'pt-BR';
  static CURRENCY = 'BRL';

  static real = (value: number | undefined): string => {
    value = value ? Number(value) : 0;

    return value.toLocaleString(Format.LOCALE, { style: 'currency', currency: Format.CURRENCY, minimumFractionDigits: 2 });
  };

  static decimal = (value: number | undefined, digits?: number): string => {
    value = value ? Number(value) : 0;
    digits = digits ? Number(digits) : 8;

    return value.toLocaleString(Format.LOCALE, { style: 'decimal', minimumFractionDigits: digits });
  };

  static date = (value: Date): string => {
    return value ? value.toLocaleDateString(Format.LOCALE) : '';
  };

  static time = (value: Date): string => {
    return value ? value.toLocaleTimeString(Format.LOCALE) : '';
  };
}

export default Format;
