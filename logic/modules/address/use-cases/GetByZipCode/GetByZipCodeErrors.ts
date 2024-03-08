import { Result } from '@/core/base/Result';
import { UseCaseError } from '@/core/base/UseCaseError';
import { ErrorCodeEnum } from '@/core/enums/ErrorCodeEnum';

export namespace GetByZipCodeErrors {
  export class InvalidZipCode extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Zip code invalid`,
        code: ErrorCodeEnum.InvalidZipCode
      } as UseCaseError);
    }
  }
}
