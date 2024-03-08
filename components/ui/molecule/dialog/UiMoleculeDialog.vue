<template>
  <q-dialog
    :model-value="props.modelValue"
    class="q-my-none dialog"
    :position="props.position"
    :maximized="props.maximized"
    @hide="$emit('update:model-value')"
  >
    <q-card class="dialog" :class="[sizeClasses[props.size]]">
      <q-card-section>
        <div
          v-if="props.closeIcon"
          class="row justify-end dialog__section__close"
        >
          <UiAtomIcon
            id="close"
            name="close"
            size="sm"
            cursor-pointer
            @click="$emit('update:model-value')"
          ></UiAtomIcon>
        </div>
      </q-card-section>

      <section class="dialog__section">
        <q-card-section class="dialog__section__title">
          <UiAtomTitle id="title-dialog" bold :type="titleTypeSize"
            ><slot name="title"></slot
          ></UiAtomTitle>
        </q-card-section>

        <q-card-section class="dialog__section__sub-title">
          <UiAtomTitle id="subtitle-dialog" type="h6" color="grey-sub-title"
            ><slot name="sub-title"></slot
          ></UiAtomTitle>
        </q-card-section>

        <q-card-section class="dialog__section__content">
          <slot name="content"></slot>
        </q-card-section>
      </section>
      <template v-if="slots.actions">
        <q-card-actions align="right" class="dialog__actions">
          <slot name="actions"></slot>
        </q-card-actions>
      </template>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { Screen } from 'quasar';
import UiAtomTitle from '../../atom/title/UiAtomTitle.vue';
import UiAtomIcon from '../../atom/icon/UiAtomIcon.vue';

const slots = useSlots();

interface IProps {
  position?: 'right' | 'left';
  size?: 'sm' | 'lg';
  modelValue: boolean | undefined;
  maximized?: boolean;
  closeIcon?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  position: 'right',
  size: 'lg',
  maximized: true,
  closeIcon: true
});

interface IEmits {
  (e: 'update:model-value'): void;
}

const titleTypeSize = computed(() => {
  return Screen.xs ? 'h6' : 'h5';
});

const sizeClasses = {
  sm: 'dialog--sm',
  lg: 'dialog--lg'
};

defineEmits<IEmits>();
</script>
<style scoped lang="scss">
.dialog {
  display: flex;
  flex-direction: column;
  &__section {
    display: flex;
    flex-direction: column;
    padding: 0 5vmin 0 5vmin;
    flex: 1;
    &__close {
      position: absolute;
      right: 10px;
    }
    &__title {
      padding: 0;
    }
    &__sub-title {
      padding: 3vmin 0 0 0;
    }
    &__content {
      padding: 4vmin 0 0 0;
    }
  }
  &__actions {
    padding: 3vmin;
  }
  &--sm {
    width: 30vw !important;
  }
  &--lg {
    width: 65vw !important;
  }
}

@media only screen and (max-width: 600px) {
  .dialog {
    width: 100vw !important;
  }
}

@media only screen and (max-width: 900px) {
  .dialog {
    width: 90vw;
  }
}

@media only screen and (max-width: 1100px) {
  .dialog {
    width: 70vw;
  }
}
</style>
