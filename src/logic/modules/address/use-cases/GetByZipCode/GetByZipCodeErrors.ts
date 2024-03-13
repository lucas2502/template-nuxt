import { Result } from '~/logic/core/base/Result';
import type { UseCaseError } from '~/logic/core/base/UseCaseError';
import { ErrorCodeEnum } from '~/logic/core/enums/ErrorCodeEnum';

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
