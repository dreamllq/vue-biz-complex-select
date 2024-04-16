
<template>
  <auto-pagination
    ref='paginationRef'
    :fetch-data='fetchTableData'
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
            v-bind='selectProps.table'>
            <!-- <el-table-column
              v-if='!selectPro'
              reserve-selection
              type='selection' 
              fixed='left' /> -->
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
                  <el-checkbox
                    :key='getKey(scope.row)'
                    class='table-checkbox'
                    :model-value='selectedDataList.some(item=>isKeyEqual(item, scope.row))'
                    :value='getKey(scope.row)'
                    :disabled='tableDataDisabled(scope.row)'
                    label=''
                    @change='selectProChange(scope.row)' />
                </el-tooltip>
              </template>
              <template #header>
                <el-checkbox 
                  class='table-checkbox'
                  :model-value='checkAllValue'
                  :indeterminate='checkAllIndeterminateValue'
                  label=''
                  @change='onCheckAllChange' />
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
import { ref, onMounted, PropType, computed, watch } from 'vue';
import { cloneDeep, get } from 'lodash';
import { useSelectState } from '@/hooks/state';

const props = defineProps({
  fetchData: {
    type: Function,
    default: () => ({
      list: [],
      total: 0 
    })
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
    type: Array as PropType<any[]>,
    default: () => ([])
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
const selectedDataList = ref<Record<string, any>[]>([]);
// const allSelectedData = ref<any[]>([]);
const currentData = ref<any[]>([]);

const availableDataList = computed(() => currentData.value.filter(row => !props.tableDataDisabled(row)));
const currentPageSelectedDataList = computed(() => selectedDataList.value.filter(row => availableDataList.value.some(item => isKeyEqual(row, item))));

const checkAllValue = computed(() => availableDataList.value.length === currentPageSelectedDataList.value.length);
const checkAllIndeterminateValue = computed(() => currentPageSelectedDataList.value.length > 0 && currentPageSelectedDataList.value.length < availableDataList.value.length);

onMounted(() => {
  selectedDataList.value = cloneDeep(props.defaultSelect);
  // console.log(selectedDataList.value);
});

const getKey = (row) => get(row, props.rowKey);
const isKeyEqual = (row1, row2) => getKey(row1) === getKey(row2);

const fetchTableData = async(pageData) => {
  const res = await selectProps.fetchData(pageData);
  currentData.value = res.list;
  if (!selectProps.reserveSelection) {
    const tempList = selectedDataList.value.filter(row => currentData.value.some((item) => isKeyEqual(row, item)));
    selectedDataList.value = tempList;
  }
  emitData();
  return res;
};
const handleQuery = async () => {
  paginationRef.value.refresh();
};

const onCheckAllChange = () => {
  console.log('check-all-change');
  if (!selectProps.reserveSelection) {
    if (checkAllValue.value) {
      selectedDataList.value = [];
    } else {
      selectedDataList.value = cloneDeep(availableDataList.value);
    }
  } else {
    if (checkAllValue.value) {
      availableDataList.value.forEach(item => {
        const index = selectedDataList.value.findIndex(row => isKeyEqual(row, item));
        if (index > -1) {
          selectedDataList.value.splice(index, 1);
        }
      });
    } else {
      availableDataList.value.forEach(item => {
        if (!selectedDataList.value.some(row => isKeyEqual(row, item))) {
          selectedDataList.value.push(cloneDeep(item));
        }
      });
    }
  }
  emitData();
};


// 主画面表格选中行方法
const selectProChange = (row: Record<string, any>) => {
  const index = selectedDataList.value.findIndex(item => isKeyEqual(item, row));
  if (index > -1) {
    selectedDataList.value.splice(index, 1);
  } else {
    selectedDataList.value.push(row);
  }

  emitData();
};

const emitData = () => {
  emits('selection-change', cloneDeep(selectedDataList.value));
};

const removeData = (index) => {
  selectedDataList.value.splice(index, 1);
  emitData();
};

defineExpose({
  handleQuery,
  removeData 
});
</script>

<style scoped lang="scss">
.table-checkbox {
  overflow: hidden;
  ::v-deep(.el-checkbox__label){
    display: none;
  }
}
</style>