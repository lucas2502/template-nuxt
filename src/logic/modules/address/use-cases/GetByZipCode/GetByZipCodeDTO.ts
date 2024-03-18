import type { AppError } from '~/logic/core/base/AppError';
import type { Either } from '~/logic/core/base/Either';
import type { Result } from '~/logic/core/base/Result';
import { GetByZipCodeErrors } from './GetByZipCodeErrors';

export namespace GetByZipCodeDTO {
  export interface Request {
    zipCode: string;
  }

  export interface ResponseBody {
    publicPlace: string;
    city: string;
    neighborhood: string;
    state: string;
    zipCode: string;
  }

  export type Response = Either<
    | AppError.UnexpectedError
    | AppError.BadRequest
    | AppError.DataNotFound
    | GetByZipCodeErrors.InvalidZipCode
    | AppError.RequiredFields,
    Result<ResponseBody>
  >;
}
