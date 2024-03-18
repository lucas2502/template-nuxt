import type { UseCase } from '~/logic/core/base/UseCase';
import type { GetByZipCodeDTO } from './GetByZipCodeDTO';
import type { IAddressService } from '../../services/AddresService';
import { Helper } from '~/logic/core/helpers/Helper';
import { left, right } from '~/logic/core/base/Either';
import { AppError } from '~/logic/core/base/AppError';
import { Result } from '~/logic/core/base/Result';
import { HttpHelper } from '~/logic/core/helpers/HttpHelper';
import type { CallError } from '~/logic/core/types/ErrorType';
import { GetByZipCodeErrors } from './GetByZipCodeErrors';

export class GetByZipCodeUseCase
  implements UseCase<GetByZipCodeDTO.Request, GetByZipCodeDTO.Response>
{
  constructor(private addressService: IAddressService) {
    this.addressService = addressService;
  }

  public async execute(
    req: GetByZipCodeDTO.Request
  ): Promise<GetByZipCodeDTO.Response> {
    if (Helper.isEmpty(req.zipCode)) {
      return left(new AppError.RequiredFields());
    }

    try {
      if (!Helper.isCepValid(req.zipCode) || Helper.isEmpty(req.zipCode)) {
        return left(new GetByZipCodeErrors.InvalidZipCode());
      }

      const data = {
        zipCode: req.zipCode
      };

      const res = await this.addressService.getByZipCode(data);

      return right(Result.ok(res));
    } catch (err) {
      if (HttpHelper.isNotFoundError(err as CallError)) {
        return left(new AppError.DataNotFound(err));
      }
      if (HttpHelper.isBadRequestError(err as CallError)) {
        return left(new AppError.BadRequest(err));
      }
      return left(new AppError.UnexpectedError(err));
    }
  }
}
