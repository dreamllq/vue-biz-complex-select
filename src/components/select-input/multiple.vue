<template>
  <div class='select-input'>
    <select-input
      :model-value='label'
      readonly
      multiple
      :multiple-line='props.multipleLine'
      :placeholder='props.placeholder'
      :disabled='props.disabled'
      :clearable='props.clearable'
      @click='onClick' 
      @clear-click='onClearClick'
      @multiple-tag-remove='onMultipleTagRemove'
    />
  </div>
</template>

<script setup lang="ts">
import { SelectInput } from 'lc-vue-select-input';
import { get } from 'lodash';
import { computed } from 'vue';

import { useSelectState } from '@/hooks/state';

const { props } = useSelectState()!;

const emit = defineEmits([
  'click',
  'clear-click',
  'multiple-tag-remove'
]);

const label = computed(() => props.modelValue.map((item) => get(item, props.formate, '')));

const onClick = (...args) => {
  if (props.disabled) return;
  emit('click', ...args);
};

const onClearClick = (...args) => {
  if (props.disabled) return;
  emit('clear-click', ...args);
};

const onMultipleTagRemove = (...args) => {
  emit('multiple-tag-remove', ...args);
};

</script>

<style scoped lang="scss">
.select-input {
  width: 100%;

  ::v-deep(.el-input) {
    .el-input__inner,.el-input__suffix-inner {
      cursor: pointer;
    }
  }

  ::v-deep(.el-input) {
    &.is-disabled {
      .el-input__inner,.el-input__suffix-inner {
        cursor: not-allowed;
      }

      .el-input__suffix-inner i {
        color: var(--el-input-placeholder-color);
      }
    }
  }
}
</style>