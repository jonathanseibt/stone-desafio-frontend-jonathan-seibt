class Format {
  static LOCALE = 'pt-BR';
  static CURRENCY = 'BRL';

  static currency = (value: number | undefined, digits?: number): string => {
    value = value ? Number(value) : 0;
    digits = digits ? Number(digits) : 4;

    if (value.toLocaleString() === '-0') value = 0;

    return value.toLocaleString(Format.LOCALE, { style: 'currency', currency: Format.CURRENCY, minimumFractionDigits: digits });
  };

  static decimal = (value: number | undefined, digits?: number): string => {
    value = value ? Number(value) : 0;
    digits = digits ? Number(digits) : 8;

    if (value.toLocaleString() === '-0') value = 0;

    return value.toLocaleString(Format.LOCALE, { style: 'decimal', minimumFractionDigits: digits });
  };

  static date = (value: Date): string => {
    return value ? new Date(value).toLocaleDateString(Format.LOCALE) : '';
  };

  static time = (value: Date): string => {
    return value ? new Date(value).toLocaleTimeString(Format.LOCALE) : '';
  };
}

export default Format;
