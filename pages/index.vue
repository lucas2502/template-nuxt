<template>
  <div></div>
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
</script>

<style lang="scss" scoped></style>
