<template>
  <multiple-input
    v-if='multiple'
    @click='inputClick'
    @clear-click='onClearClick'
    @multiple-tag-remove='onMultipleTagRemove' />
  <single-input
    v-else
    @click='inputClick'
    @clear-click='onClearClick' />
  <select-dialog
    ref='selectDialogRef'
    :dialog-title='props.dialogTitle'
    :multiple='multiple'
    :filter-model='props.filterModel'
    :table-data-disabled='props.tableDataDisabled'
    :disabled-reason='props.disabledReason'
    @confirm='onConfirm'
    @open='onOpen'
    @opened='onOpened'
    @close='onClose'
    @closed='onClosed'>
    <template #filter-content>
      <slot name='filter-content' />
    </template>
    <template #table-content>
      <slot name='table-content' />
    </template>
  </select-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import SingleInput from './select-input/single.vue';
import MultipleInput from './select-input/multiple.vue';
import SelectDialog from './select-dialog/index.vue';
import { cloneDeep } from 'lodash';
import { useSelectState } from '@/hooks/state';

const { props } = useSelectState()!;
const emit = defineEmits([
  'change',
  'update:modelValue',
  'input-click',
  'open',
  'opened',
  'close',
  'closed'
]);

const initFilterModel = cloneDeep(props.filterModel);

const multiple = ref(props.multiple);
const inputRow = ref<{id:any} | null>(props.modelValue as {id:any} | null);
const inputRows = ref<{id:any}[]>(props.modelValue as {id:any}[]);

const selectDialogRef = ref();

const inputClick = () => {
  selectDialogRef.value.show({ defaultData: props.modelValue });
};

const onClearClick = () => {
  if (multiple.value) {
    inputRows.value = [];
    emit('update:modelValue', cloneDeep(inputRows.value));
  } else {
    inputRow.value = null;
    emit('update:modelValue', cloneDeep(inputRow.value));
  }
};

const onMultipleTagRemove = (index) => {
  if (multiple.value) {
    inputRows.value.splice(index, 1);
    emit('update:modelValue', cloneDeep(inputRows.value));
  }
};

const onConfirm = (data) => {
  if (multiple.value) {
    inputRows.value = data;
    console.log('data', data);
    emit('update:modelValue', cloneDeep(data));
  } else {
    inputRow.value = data;
    emit('update:modelValue', data);
  }
};

const onOpen = () => {
  emit('open');
};
const onOpened = () => {
  emit('opened');
};
const onClose = () => {
  emit('close');
};
const onClosed = () => {
  emit('closed');
  Object.keys(initFilterModel).forEach(key => {
    props.filterModel[key] = initFilterModel[key];
  });
};

watch(() => props.modelValue, (newVal: any) => {
  if (multiple.value) {
    inputRow.value = newVal;
  } else {
    inputRow.value = newVal;
  }
}, { deep: true });
</script>

<style scoped>

</style>