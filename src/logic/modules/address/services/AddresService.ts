import type { HttpAdapter } from '~/logic/core/adapter/HttpAdapter';
import type { AddressServiceDTO } from './AddressServiceDTO';
import type { HttpResponseBody } from '~/logic/core/types/HttpResponseBody';

const config = useRuntimeConfig();

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
    const url = `${config.public.api.apiBaseUrl}/v1/address-by-zipcode`;

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
