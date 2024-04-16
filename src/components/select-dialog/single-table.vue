
<template>
  <auto-pagination
    ref='paginationRef'
    :fetch-data='selectProps.fetchData'
    auto-init
    v-bind='selectProps.pagination'>
    <template #default='{ data }'>
      <auto-height-wrapper>
        <template #default='{ size }'>
          <el-table
            ref='tableRef'
            border
            :data='data'
            :height='size.height'
            v-bind='selectProps.table'
            class='el-table-radio'>
            <el-table-column
              fixed='left'
              width='50px'>
              <template #default='scope'>
                <el-tooltip
                  effect='dark'
                  :content='disabledReason(scope.row)'
                  :disabled='!tableDataDisabled(scope.row)'
                  placement='right'
                >
                  <el-radio-group
                    :model-value='isKeyEqual(scope.row, selectData)' 
                    :disabled='tableDataDisabled(scope.row)'
                    @change='radioSelectChange(scope.row)'>
                    <el-radio :value='true' />
                  </el-radio-group>
                </el-tooltip>
              </template>
            </el-table-column>
            <slot name='table-content' />
          </el-table>
        </template>
      </auto-height-wrapper>
    </template>
  </auto-pagination>
</template>

<script setup lang="ts">
import { AutoHeightWrapper } from 'lc-vue-auto-height-wrapper';
import { AutoPagination } from 'lc-vue-auto-pagination';
import { cloneDeep, get } from 'lodash';
import { ref, onMounted, PropType } from 'vue';
import { useSelectState } from '@/hooks/state';

const props = defineProps({
  tableDataDisabled: {
    type: Function,
    default: () => (false)
  },
  disabledReason: {
    type: Function,
    default: () => ('')
  },
  defaultSelect: {
    type: Object as PropType<{id:any}>,
    default: () => ({})
  },
  rowKey: {
    type: String,
    default: 'id'
  }
});
const { props: selectProps } = useSelectState()!;

  
const emits = defineEmits(['selection-change']);
const tableRef = ref();
const paginationRef = ref();
const selectData = ref<{id: any} | null>();

onMounted(() => {
  selectData.value = cloneDeep(props.defaultSelect);
  if (selectData.value) {
    emits('selection-change', [cloneDeep(selectData.value)]);
  } else {
    emits('selection-change', []);
  }
});

const getKey = (row) => get(row, props.rowKey);
const isKeyEqual = (row1, row2) => getKey(row1) === getKey(row2);

const handleQuery = async () => {
  paginationRef.value.refresh();
};

// 主画面表格选中行方法
const radioSelectChange = (data:{id:any}) => {
  // 当前有选中数据，且id与本次相同
  if (selectData.value && isKeyEqual(data, selectData.value)) {
    selectData.value = null;
    emits('selection-change', []);
  } else {
    selectData.value = data;
    emits('selection-change', [data]);
  }
};

defineExpose({ handleQuery });
</script>
