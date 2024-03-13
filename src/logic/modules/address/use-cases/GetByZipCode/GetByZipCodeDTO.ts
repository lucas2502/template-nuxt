import type { Either } from '~/src/logic/core/base/Either';
import { GetByZipCodeErrors } from './GetByZipCodeErrors';
import type { AppError } from '~/src/logic/core/base/AppError';
import type { Result } from '~/src/logic/core/base/Result';

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
