import { IAddressService } from '../../services/AddresService';
import { GetByZipCodeDTO } from './GetByZipCodeDTO';
import { GetByZipCodeErrors } from './GetByZipCodeErrors';
import { UseCase } from '@/core/base/UseCase';
import { Helper } from '@/core/helpers/Helper';
import { left, right } from '@/core/base/Either';
import { Result } from '@/core/base/Result';
import { HttpHelper } from '@/core/helpers/HttpHelper';
import { CallError } from '@/core/types/ErrorType';
import { AppError } from '@/core/base/AppError';

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
