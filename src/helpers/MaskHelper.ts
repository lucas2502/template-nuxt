export namespace MaskHelper {
  export class Mask {
    static Phone = '## #####-####';

    static Cnpj = '##.###.###/####-##';

    static Cpf = '###.###.###-##';

    static Date = '##/##/####';

    static DateMonthYear = '##/####';

    static Cep = '#####-###';

    static Rg = ['##.###.###-I'];

    static Cnh = '#########-##';

    static Agency = '####';

    static Account = '#####-#';

    static PersonName = (v?: number) => {
      return 'S'.repeat(v ?? 100);
    };

    static Number = (v?: number) => {
      return ['#'.repeat(v ?? 100)];
    };

    static WordAndNumber = (v?: number) => {
      return 'N'.repeat(v ?? 100);
    };

  }
}

// C: /[0-9a-zA-Z\u00C0-\u024F\u1E00-\u1EFF ]/,
// S: /[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF ]/,
