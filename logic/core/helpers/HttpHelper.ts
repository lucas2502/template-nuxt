import type { CallError } from '../types/ErrorType';

export class HttpHelper {
  static isNotFoundError(err: CallError): boolean {
    if (
      err.code === '404' ||
      err.message.includes('404') ||
      err.message.includes('Not found')
    ) {
      return true;
    }

    return false;
  }

  static isUnauthorizedError(err: CallError): boolean {
    if (
      err.code === '401' ||
      err.message.includes('401') ||
      err.message.includes('Unauthorized')
    ) {
      return true;
    }

    return false;
  }

  static isBadRequestError(err: CallError): boolean {
    if (
      err.code === '400' ||
      err.message.includes('400') ||
      err.message.includes('Bad Request')
    ) {
      return true;
    }

    return false;
  }
}
