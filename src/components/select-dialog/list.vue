<template>
  <flex direction='column' fit>
    <flex display='block'>
      <dialog-filter ref='dialogFilter' :filter-model='filterModel' @search='onSearch'>
        <template #filter-content>
          <slot name='filter-content' />
        </template>
      </dialog-filter>
    </flex>
    <flex v-if='selectProps.multiple && selectProps.reserveSelection' display='block' style='margin-top: 8px;'>
      <div class='selected-list'>
        <template v-for='(item, index) in selectList' :key='index'>
          <el-tag
            closable
            type='info'
            class='tag-item'
            @close='onTagRemove(index)'>
            {{ getRowLabel(item) }}
          </el-tag>
        </template>
      </div>
    </flex>
    <flex display='block' flex='1' style='margin-top: 8px;'>
      <multiple-table
        v-if='multiple'
        ref='dialogTableRef'
        :default-select='defaultSelect'
        :table-data-disabled='tableDataDisabled'
        :disabled-reason='disabledReason'
        :row-key='rowKey'
        @selection-change='onSelectedChange'>
        <template #table-content>
          <slot name='table-content' />
        </template>
      </multiple-table>
      <single-table
        v-else
        ref='dialogTableRef'
        :default-select='defaultSelect'
        :table-data-disabled='tableDataDisabled'
        :disabled-reason='disabledReason'
        :row-key='rowKey'
        @selection-change='onSelectedChange'>
        <template #table-content>
          <slot name='table-content' />
        </template>
      </single-table>
    </flex>
  </flex>
</template>

<script setup lang="ts">
import { Flex } from 'lc-vue-flex';
import DialogFilter from './filter.vue';
import MultipleTable from './multiple-table.vue';
import SingleTable from './single-table.vue';
import { ref, PropType } from 'vue';
// import { cloneDeep } from 'lodash';
import { useSelectState } from '@/hooks/state';
import { get } from 'lodash';

const props = defineProps({
  filterModel: {
    type: Object,
    default: () => ({})
  },
  multiple: {
    type: Boolean,
    default: false
  },
  tableDataDisabled: {
    type: Function,
    default: () => (false)
  },
  disabledReason: {
    type: Function,
    default: () => ('')
  },
  defaultSelect: {
    type: [Object, Array] as PropType<any>,
    default: undefined
  },
  rowKey: {
    type: String,
    default: 'id'
  }
});
const { props: selectProps } = useSelectState()!;

const getRowLabel = (row) => get(row, selectProps.formate, '');

const emits = defineEmits(['table-selected-change']);
const rowData = ref(null);
const selectList = ref();
const dialogTableRef = ref();

const onSearch = async () => {
  await dialogTableRef.value.handleQuery();
  if (rowData.value !== null) {
    dialogTableRef.value.toggleRowSelection(rowData.value);
  } 
};
const onSelectedChange = (row) => {
  selectList.value = row;
  emits('table-selected-change', row.length <= 0);
};

const onTagRemove = (index) => {
  dialogTableRef.value.removeData(index);
};

const returnSelect = () => {
  if (props.multiple) {
    return selectList.value;
  }
  return selectList.value[0];
};
defineExpose({ returnSelect });
</script>

<style scoped lang="scss">
.selected-list{
  min-height:  var(--el-input-inner-height);
  height: auto;
  padding: 2px 0;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-width: 0;
  gap: 6px;
}
</style>