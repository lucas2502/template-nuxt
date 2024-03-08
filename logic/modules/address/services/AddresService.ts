import { AddressServiceDTO } from './AddressServiceDTO';
import { HttpAdapter } from '@/core/adapter/HttpAdapter';
import { HttpResponseBody } from '@/core/types/HttpResponseBody';
import { Config } from '@/config';

export interface IAddressService {
  getByZipCode(
    input: AddressServiceDTO.GetByZipCode.Input
  ): Promise<AddressServiceDTO.GetByZipCode.Output>;
}
export class AddressService implements IAddressService {
  constructor(private httpAdapter: HttpAdapter) {
    this.httpAdapter = httpAdapter;
  }

  async getByZipCode(
    input: AddressServiceDTO.GetByZipCode.Input
  ): Promise<AddressServiceDTO.GetByZipCode.Output> {
    const url = `${Config.getInstance.apiBaseUrl}/v1/address-by-zipcode`;

    const body = {
      zipCode: input.zipCode
    };

    const res: HttpResponseBody<AddressServiceDTO.GetByZipCode.Output> =
      await this.httpAdapter.post({
        url,
        body
      });

    return res.data;
  }
}
