<template>
  <ff-button
    :id="id"
    :button-text="label"
    :data-testid="id"
    :disabled="disabled"
    :size="sizeClasses[size]"
    :type="typeClasses[type]"
    :class="[
      {
        'btn--capitalize': capitalize,
        'btn--full-width': fullWidth
      }
    ]"
    @click="doClick"
  >
  </ff-button>
</template>

<script setup lang="ts">
interface IProps {
  id: string;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'default';
  fullWidth?: boolean;
  capitalize?: boolean;
  loading?: boolean;
  type:
    | 'outlined'
    | 'primary'
    | 'negative'
    | 'negativeOutline'
    | 'positive'
    | 'positiveOutline';
}

// TODO - Vamos ter que baixar a imagem de imprimir. Ela não existe no material icons. a opção "Print" de agora é só provisória.
withDefaults(defineProps<IProps>(), {
  type: 'primary',
  label: undefined,
  disabled: false,
  size: 'default',
  fullWidth: false,
  capitalize: true,
  loading: false
});

const sizeClasses = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  default: '16px'
};

const typeClasses = {
  outlined: 'outlined',
  primary: 'primary',
  negative: 'negative',
  negativeOutline: 'negative-outline',
  positive: 'positive',
  positiveOutline: 'positive-utline'
};

interface IEmits {
  (e: 'click'): void;
}

const emit = defineEmits<IEmits>();

function doClick() {
  emit('click');
}
</script>

<style scoped lang="scss">
* {
  font-weight: 400;
}
.btn {
  &--disabled {
    color: var(--grey-sub-title) !important;
    background-color: var(--grey-disable) !important;
  }
  &--bold {
    font-weight: bold;
  }
  &--capitalize {
    text-transform: uppercase;
  }
  &--full-width {
    width: 100%;
  }
}
</style>
