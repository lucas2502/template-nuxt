export class FormatHelper {
  static formatMoney(value: number | string): string {
    return value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  static formatDateString(value: string): string {
    const date = new Date(value);
    return date.toLocaleDateString('pt-BR', {
      timeZone: 'UTC'
    });
  }

  static removeSpecialCharsFromString(val: string): string {
    return val.replace(/[^\w\s]/gi, '');
  }

  static removeBlankSpaceFromString(val: string): string {
    return val.replace(/[^\w]/gi, '');
  }

  static removeDotFromMoneyString(val: string): number {
    return Number(val.replace(/\./g, '').replace(/,/g, '.'));
  }

  static transformObjectValues(
    obj: Record<string, any>,
    transformer: (val: any) => any
  ) {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = transformer(value);
    }
    return result;
  }

  static formatCep(value: string | number): string {
    return value
      .toString()
      .replace(/(\d{5})(\d{3})/, '$1-$2')
      .substring(0, 9);
  }

  static formatCpf(value: string | number): string {
    return value
      .toString()
      .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  static formatCnpj(value: string | number): string {
    return value
      .toString()
      .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  static formatPhoneNumber(phoneNumber: string): string {
    // Remove todos os caracteres não numéricos
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Verifica se o número de telefone tem 9 dígitos (com o nono dígito)
    if (cleanedPhoneNumber.length === 11) {
      return `(${cleanedPhoneNumber.slice(0, 2)}) ${cleanedPhoneNumber.slice(
        2,
        7
      )}-${cleanedPhoneNumber.slice(7)}`;
    } else if (cleanedPhoneNumber.length === 10) {
      // Verifica se o número de telefone tem 8 dígitos (sem o nono dígito)
      return `(${cleanedPhoneNumber.slice(0, 2)}) ${cleanedPhoneNumber.slice(
        2,
        6
      )}-${cleanedPhoneNumber.slice(6)}`;
    } else {
      // Retorna o número de telefone sem formatação se não for possível formatá-lo
      return phoneNumber;
    }
  }

  static getShortName(value: string): string {
    const name = value;

    return name.replace(/^(\w+)\s+(\w+)(?:\s+\w+)*\s+(\w+)$/, '$1 $3');
  }

  static formatIsoDateToDdMmYyyy(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  static parseYyyyMmDdToDate(dateString: string): string {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toISOString();
  }

  static sanitizeString(value: string): string {
    return value.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
  }

  static formatIsoDateAndTimeToDdMmYyyy(dateTimeString: string) {
    // Criar objeto Date com o dateTimeString
    const dateTime = new Date(dateTimeString);

    // Ajustar para o fuso horário de Brasília (UTC-3)
    const offset = -3; // Horário de Brasília (UTC-3)
    const localTime = dateTime.getTime() + offset * 60 * 60 * 1000;
    const dateTimeBrasilia = new Date(localTime);

    // Extrair dia, mês, ano, horas e minutos
    const day = ('0' + dateTimeBrasilia.getDate()).slice(-2);
    const month = ('0' + (dateTimeBrasilia.getMonth() + 1)).slice(-2);
    const year = dateTimeBrasilia.getFullYear();
    const hours = ('0' + dateTimeBrasilia.getHours()).slice(-2);
    const minutes = ('0' + dateTimeBrasilia.getMinutes()).slice(-2);

    // Formatar e retornar a data e hora no formato desejado
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }
}
