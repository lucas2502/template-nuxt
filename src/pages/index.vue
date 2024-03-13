<template>
  <div>
    <h1>Hello World!!</h1>
    <ff-button
      button-text="Click me"
      size="large"
      type="primary"
      @click="submit"
    ></ff-button>
  </div>
</template>

<script setup lang="ts">
import getByZipCodeUseCase from '~/logic/modules/address/use-cases/GetByZipCode';

onMounted(async () => {
  const res = await getByZipCodeUseCase.execute({
    zipCode: '04750030'
  });
  if (res.isRight()) {
    console.log(res.value.getValue());
  }
});

function submit() {
  console.log('test');
}
</script>

<style lang="scss" scoped></style>
~/src/logic/modules/address/use-cases/GetByZipCode
