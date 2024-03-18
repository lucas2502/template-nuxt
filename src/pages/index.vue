<template>
  <div>
    <h1>Hello World!!</h1>
    <ff-button
      button-text="Click me"
      size="large"
      type="primary"
      @click="submit('12345')"
    ></ff-button>
    <UiAtomButton
      id="btn-submit"
      label="Click me"
      size="md"
      capitalize
      type="negative"
      :full-width="true"
    ></UiAtomButton>
  </div>
</template>

<script setup lang="ts">
import { ErrorCodeEnum } from '~/logic/core/enums/ErrorCodeEnum';

import getByZipCodeUseCase from '~/logic/modules/address/use-cases/GetByZipCode';

async function submit(value: string) {
  const body = {
    zipCode: value
  };
  const res = await getByZipCodeUseCase.execute(body);

  if (res.isLeft()) {
    const code = res.value.errorValue().code;

    if (code === ErrorCodeEnum.AccessDenied) {
      return alert('AccessDenied');
    }

    return alert('Generic error');
  }

  if (res.isRight()) {
    console.log(res.value.getValue());
  }
}
</script>

<style lang="scss" scoped></style>
