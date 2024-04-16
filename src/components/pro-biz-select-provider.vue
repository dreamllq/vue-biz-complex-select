<template>
  <slot />
</template>

<script setup lang="ts">
import propsDefine from './props';
import { useProvideSelectState } from '@/hooks/state';
const props = defineProps(propsDefine);
useProvideSelectState(props);
</script>

<style scoped>

</style>