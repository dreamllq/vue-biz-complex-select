
<template>
  <form-grid :model='filterModel' v-bind='selectProps.formGrid' @search='onSearch'>
    <slot name='filter-content' />
  </form-grid>
</template>

<script setup lang="ts">
import { FormGrid } from 'lc-vue-form-filter';
import { onMounted } from 'vue';
import { useSelectState } from '@/hooks/state';

const props = defineProps({
  filterModel: {
    type: Object,
    default: () => ({})
  }
});

const { props: selectProps } = useSelectState()!;

const emits = defineEmits(['search']);

onMounted(() => {
  emits('search');
});

const onSearch = () => {
  emits('search');
};
</script>
