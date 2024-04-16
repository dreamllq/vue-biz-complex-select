<template>
  <pro-biz-select-provider v-bind='props'>
    <pro-biz-select-main
      @update:model-value='onUpdateModelValue'
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
    </pro-biz-select-main>
  </pro-biz-select-provider>
</template>

<script setup lang="ts">
import propsDefine from './props';
import ProBizSelectProvider from './pro-biz-select-provider.vue';
import ProBizSelectMain from './pro-biz-select-main.vue';

const props = defineProps(propsDefine);

const emits = defineEmits([
  'update:model-value',
  'open',
  'opened',
  'close',
  'closed'
]);
const onUpdateModelValue = (...args) => {
  emits('update:model-value', ...args);
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
</script>

<style scoped>

</style>