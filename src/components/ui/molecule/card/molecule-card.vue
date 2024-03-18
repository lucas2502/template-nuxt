<template>
  <ff-simple-card :id="id" :data-testid="id" :width="width" :height="height">
    <template #header> </template>
    <slot></slot>
    <template #footer> </template>
  </ff-simple-card>
</template>

<script setup lang="ts">
interface IProps {
  id: string;
  width?: string;
  height?: string;
}

// TODO - Vamos ter que baixar a imagem de imprimir. Ela não existe no material icons. a opção "Print" de agora é só provisória.
withDefaults(defineProps<IProps>(), {
  width: undefined,
  height: undefined
});
</script>

<style scoped lang="scss"></style>
