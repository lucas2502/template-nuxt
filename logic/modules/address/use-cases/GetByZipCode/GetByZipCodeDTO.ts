import { GetByZipCodeErrors } from './GetByZipCodeErrors';
import { AppError } from '@/core/base/AppError';
import { Either } from '@/core/base/Either';
import { Result } from '@/core/base/Result';

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
