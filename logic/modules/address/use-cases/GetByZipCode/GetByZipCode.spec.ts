import { vi } from 'vitest';
import { AddressServiceMock } from '../../services/AddressServiceMock';
import { GetByZipCodeDTO } from './GetByZipCodeDTO';
import { GetByZipCodeUseCase } from './GetByZipCodeUseCase';
import { UseCase } from '@/core/base/UseCase';
import { ErrorCodeEnum } from '@/core/enums/ErrorCodeEnum';
import { UseCaseError } from '@/core/base/UseCaseError';

describe('UseCase: Address/GetByZipCode', () => {
  let useCase: UseCase<GetByZipCodeDTO.Request, GetByZipCodeDTO.Response>;

  beforeAll(async () => {
    useCase = (await import('.')).default;
  });

  test('should get address with success', async () => {
    const res = await useCase.execute({
      zipCode: '04069010'
    });

    expect(res.isRight()).toBe(true);

    const successValue = res.value.getValue() as GetByZipCodeDTO.ResponseBody;

    expect(successValue).toMatchObject({
      publicPlace: 'Rua Teste de Araujo',
      city: 'Sao Paulo',
      neighborhood: 'Centro',
      state: 'SP',
      zipCode: '54000450'
    });
  });

  test('should return error when zip code is invalid', async () => {
    const res = await useCase.execute({ zipCode: '0406901044' });

    expect(res.isRight()).toBe(false);

    const errorValue = (
      res as GetByZipCodeDTO.Response
    ).value.errorValue() as UseCaseError;

    expect(errorValue.code).toBe(ErrorCodeEnum.InvalidZipCode);
  });

  test('should return error when zip code is empty', async () => {
    const res = await useCase.execute({
      zipCode: ''
    });

    expect(res.isRight()).toBe(false);

    const errorValue = (
      res as GetByZipCodeDTO.Response
    ).value.errorValue() as UseCaseError;

    expect(errorValue.code).toBe(ErrorCodeEnum.RequiredFields);
  });

  test('should return error when zip code is null', async () => {
    const res = await useCase.execute({
      // @ts-ignore
      zipCode: null
    });

    expect(res.isRight()).toBe(false);

    const errorValue = (
      res as GetByZipCodeDTO.Response
    ).value.errorValue() as UseCaseError;

    expect(errorValue.code).toBe(ErrorCodeEnum.RequiredFields);
  });

  test('should return error when zip code is undefined', async () => {
    const res = await useCase.execute({
      // @ts-ignore
      zipCode: undefined
    });

    expect(res.isRight()).toBe(false);

    const errorValue = (
      res as GetByZipCodeDTO.Response
    ).value.errorValue() as UseCaseError;

    expect(errorValue.code).toBe(ErrorCodeEnum.RequiredFields);
  });

  test('should return Unexpected Error', async () => {
    const service = new AddressServiceMock();

    const spy = vi.spyOn(service, 'getByZipCode');

    spy.mockImplementationOnce((): any => {
      return Promise.reject(new Error('Unexpexted error'));
    });

    const useCase = new GetByZipCodeUseCase(service);

    const res = await useCase.execute({
      zipCode: '04069010'
    });

    expect(res.isRight()).toBe(false);

    const errorValue = (
      res as GetByZipCodeDTO.Response
    ).value.errorValue() as UseCaseError;

    expect(errorValue.code).toBe(ErrorCodeEnum.UnexpectedError);
  });

  test('should return Bad Request Error', async () => {
    const service = new AddressServiceMock();

    const spy = vi.spyOn(service, 'getByZipCode');

    spy.mockImplementationOnce((): any => {
      return Promise.reject(new Error('Bad Request'));
    });

    const useCase = new GetByZipCodeUseCase(service);

    const res = await useCase.execute({
      zipCode: '04069010'
    });

    expect(res.isRight()).toBe(false);

    const errorValue = (
      res as GetByZipCodeDTO.Response
    ).value.errorValue() as UseCaseError;

    expect(errorValue.code).toBe(ErrorCodeEnum.BadRequest);
  });

  test('should return Not Found Error', async () => {
    const service = new AddressServiceMock();

    const spy = vi.spyOn(service, 'getByZipCode');

    spy.mockImplementationOnce((): any => {
      return Promise.reject(new Error('404 Not Found'));
    });

    const useCase = new GetByZipCodeUseCase(service);

    const res = await useCase.execute({
      zipCode: '04069010'
    });

    expect(res.isRight()).toBe(false);

    const errorValue = (
      res as GetByZipCodeDTO.Response
    ).value.errorValue() as UseCaseError;

    expect(errorValue.code).toBe(ErrorCodeEnum.NotFound);
  });
});
