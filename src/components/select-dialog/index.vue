
<template>
  <el-dialog
    v-model='visible'
    :title='props.dialogTitle'
    :close-on-click-modal='false'
    append-to-body
    align-center
    class='biz-complex-select__dialog'
    width='1008px'
    @open='onOpen'
    @opened='onOpened'
    @close='onClose'
    @closed='onClosed'>
    <data-list
      v-if='visible'
      ref='dataListRef'
      :multiple='props.multiple'
      :default-select='defaultSelect'
      :filter-model='props.filterModel'
      :table-data-disabled='props.tableDataDisabled'
      :disabled-reason='props.disabledReason'
      :row-key='props.rowKey'>
      <template #filter-content>
        <slot name='filter-content' />
      </template>
      <template #table-content>
        <slot name='table-content' />
      </template>
    </data-list>
    <template #footer>
      <span class='dialog-footer'>
        <el-button type='primary' plain @click='visible = false'>取消</el-button>
        <el-button
          type='primary'
          :loading='submitLoading'
          @click='onConfirm'>确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import DataList from './list.vue';
import { ref } from 'vue';

import { useSelectState } from '@/hooks/state';

const { props } = useSelectState()!;

const emits = defineEmits([
  'confirm',
  'open',
  'opened',
  'close',
  'closed'
]);
const visible = ref(false);
const submitLoading = ref(false);
const defaultSelect = ref(undefined);

const show = ({ defaultData }) => {
  defaultSelect.value = defaultData;
  visible.value = true;
};

const dataListRef = ref();
const onConfirm = async () => {
  try {
    submitLoading.value = true;
    const data = dataListRef.value.returnSelect();
    // await props.preSubmit(data);
    emits('confirm', data);
    visible.value = false;
  } finally {
    submitLoading.value = false;
  }
};

const onOpen = () => {
  emits('open');
};
const onOpened = () => {
  emits('opened');
};
const onClose = () => {
  emits('close');
};
const onClosed = () => {
  emits('closed');
};

defineExpose({ show });
</script>
