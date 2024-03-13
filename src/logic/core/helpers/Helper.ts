// import { Config } from '@/config';

export class Helper {
  static textToCode(text: string): string {
    let code: string | undefined;
    if (text !== undefined && text.includes(' ')) {
      code = text.replace(/ /g, '_');
    } else {
      code = text;
    }
    return code.toUpperCase();
  }

  static parseJwt(token: string) {
    if (!token) {
      return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  static replaceText(text: string): string {
    let code: string | undefined;
    if (text !== undefined && text.includes('-')) {
      code = text.replace(/-(?!>)/g, ' ');
    } else {
      code = text;
    }
    return code.toUpperCase();
  }

  static isTestMode(): boolean {
    // return Config.getInstance?.isMockActive === true;
    return true;
  }

  static getCleanObj(obj: Record<string, any>): Record<string, any> {
    const localObj = JSON.parse(JSON.stringify(obj));
    Object.keys(localObj).forEach(
      (key: any) => this.isEmpty(localObj[key as any]) && delete localObj[key]
    );
    return localObj;
  }

  static isEmpty(val: any): boolean {
    const s = val;
    return s === '' || s === null || s === undefined;
  }

  static isNotEmpty(val: any): boolean {
    return !this.isEmpty(val);
  }

  static isDefined<T>(val: T | undefined | null): val is T {
    const s = val;
    return s !== null && s !== undefined;
  }

  static isNotDefined<T>(val: T | undefined | null): val is T {
    return !this.isDefined<T>(val);
  }

  static downloadFile({
    fileName,
    content
  }: {
    fileName: string;
    content: string;
  }) {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
    );
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  static downloadBlob({
    fileName,
    content
  }: {
    fileName: string;
    content: any;
  }) {
    const element = document.createElement('a');
    element.setAttribute('href', URL.createObjectURL(content));
    element.setAttribute('download', `${fileName}`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  static isJson(body: any) {
    try {
      JSON.parse(body);
      return true;
    } catch (err) {
      return false;
    }
  }

  static getDate(arr: number[]): string | undefined {
    let d: Date | undefined;

    function _getDay(n: number) {
      return n > 0 ? n - 1 : n;
    }

    if (arr.length === 3) {
      d = new Date(arr[0], _getDay(arr[1]), arr[2]);
    } else if (arr.length === 5) {
      d = new Date(arr[0], _getDay(arr[1]), arr[2], arr[3], arr[4]);
    } else if (arr.length === 6) {
      d = new Date(arr[0], _getDay(arr[1]), arr[2], arr[3], arr[4], arr[5]);
    }

    if (d !== undefined) {
      const formatter = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'medium'
      });
      return formatter.format(d);
    }

    return undefined;
  }

  static isJwtExpired(token: string): boolean {
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    const json = JSON.parse(payload.toString());

    return Date.now() < json.exp * 1000;
  }

  static isCepValid(cep: string): boolean {
    return /(^[0-9]{5})-?([0-9]{3}$)/.test(cep);
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

  static isValidEmail = (v: any) => {
    return (
      v &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      )
    );
  };

  static isValidCnpj(cnpj: string): boolean {
    // Remover caracteres não numéricos
    cnpj = cnpj.replace(/\D/g, '');

    // Verificar se CNPJ tem 14 dígitos
    if (cnpj.length !== 14) return false;

    // Calcular primeiro dígito verificador
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj[i]) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    const firstDV = 11 - (sum % 11);
    const firstDvCalculated = firstDV > 9 ? 0 : firstDV;

    // Calcular segundo dígito verificador
    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj[i]) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    const secondDV = 11 - (sum % 11);
    const secondDvCalculated = secondDV > 9 ? 0 : secondDV;

    // Comparar com os dois últimos dígitos fornecidos
    const lastDigits = parseInt(cnpj.slice(12));
    return lastDigits === firstDvCalculated * 10 + secondDvCalculated;
  }
}
