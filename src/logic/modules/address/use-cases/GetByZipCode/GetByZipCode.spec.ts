import { describe, beforeAll, test, expect, vi } from 'vitest';
import { ErrorCodeEnum } from '~/logic/core/enums/ErrorCodeEnum';
import type { GetByZipCodeDTO } from './GetByZipCodeDTO';
import type { UseCase } from '~/logic/core/base/UseCase';
import type { UseCaseError } from '~/logic/core/base/UseCaseError';
vi.mock('~/helpers/Helper', () => {
  return {
    Helper: {
      isTestMode: () => true,
    },
  };
});

import { AddressServiceMock } from '../../services/AddressServiceMock';
import { GetByZipCodeUseCase } from './GetByZipCodeUseCase';

describe('UseCase: Address/GetByZipCode', () => {
  let useCase: UseCase<GetByZipCodeDTO.Request, GetByZipCodeDTO.Response>;

  beforeAll(() => {
    const addressServiceMock = new AddressServiceMock();
    useCase = new GetByZipCodeUseCase(addressServiceMock);
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
