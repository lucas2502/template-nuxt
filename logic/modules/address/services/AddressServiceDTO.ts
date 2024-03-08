import { Address } from '../models/Address';

export namespace AddressServiceDTO {
  export namespace GetByZipCode {
    export interface Input {
      zipCode: string;
    }

    export interface Output extends Address {}
  }
}
