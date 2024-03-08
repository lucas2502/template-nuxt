import { IAddressService } from './AddresService';
import { AddressServiceDTO } from './AddressServiceDTO';

export class AddressServiceMock implements IAddressService {
  async getByZipCode(
    _input: AddressServiceDTO.GetByZipCode.Input
  ): Promise<AddressServiceDTO.GetByZipCode.Output> {
    const returnBody = {
      publicPlace: 'Rua Teste de Araujo',
      city: 'Sao Paulo',
      neighborhood: 'Centro',
      state: 'SP',
      zipCode: '54000450'
    };

    return await new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve(returnBody);
        }, 1000);
      } catch (err) {
        return reject(err);
      }
    });
  }
}
