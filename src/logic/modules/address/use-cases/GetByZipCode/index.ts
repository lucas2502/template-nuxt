import { Helper } from '~/helpers/Helper';
import { AddressService } from '../../services/AddresService';
import { AddressServiceMock } from '../../services/AddressServiceMock';
import { GetByZipCodeUseCase } from './GetByZipCodeUseCase';
import { HttpAdapter } from '~/logic/core/adapter/HttpAdapter';

const MOCK = Helper.isTestMode();

const httpAdapter = new HttpAdapter();

const adressService = MOCK
  ? new AddressServiceMock()
  : new AddressService(httpAdapter);

const getByZipCodeUseCase = new GetByZipCodeUseCase(adressService);

export default getByZipCodeUseCase;
