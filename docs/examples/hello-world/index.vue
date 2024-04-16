<template>
  <div>
    <div>单选</div>
    <pro-biz-select
      v-model='bizObj'
      :filter-model='filter'
      dialog-title='选择'
      :fetch-data='fetchData'
      :table-data-disabled='tableDataDisabled'
      :disabled-reason='disabledReason'
      formate='name'
      clearable
      row-key='ida'
    >
      <template #filter-content>
        <form-grid-item label='名称' prop='name'>
          <template #default>
            <el-input
              v-model='filter.name'
              placeholder='请输入'
              multiple />
          </template>
        </form-grid-item>
        <form-grid-item label='编号' prop='code'>
          <template #default>
            <el-input
              v-model='filter.code'
              placeholder='请输入'
              multiple />
          </template>
        </form-grid-item>
      </template>
      <template #table-content>
        <el-table-column
          prop='name'
          label='名称'
          min-width='130'
          show-overflow-tooltip />
        <el-table-column
          prop='code'
          label='编号'
          min-width='130'
          show-overflow-tooltip />
      </template>
    </pro-biz-select>
    当前选中：{{ bizObj }}

    <div style='margin-top: 50px;'>
      多选
    </div>
    <pro-biz-select
      v-model='bizObjList'
      :filter-model='filter'
      multiple
      dialog-title='选择'
      :fetch-data='fetchData'
      :table-data-disabled='tableDataDisabled'
      :disabled-reason='disabledReason'
      formate='name'
      row-key='ida'
      clearable
    >
      <template #filter-content>
        <form-grid-item label='名称' prop='name'>
          <template #default>
            <el-input
              v-model='filter.name'
              placeholder='请输入'
              multiple />
          </template>
        </form-grid-item>
        <form-grid-item label='编号' prop='code'>
          <template #default>
            <el-input
              v-model='filter.code'
              placeholder='请输入'
              multiple />
          </template>
        </form-grid-item>
      </template>
      <template #table-content>
        <el-table-column
          prop='name'
          label='名称'
          min-width='130'
          show-overflow-tooltip />
        <el-table-column
          prop='code'
          label='编号'
          min-width='130'
          show-overflow-tooltip />
      </template>
    </pro-biz-select>
    当前选中：{{ bizObjList }}

    <div style='margin-top: 50px;'>
      多选(支持跨页)
    </div>
    <pro-biz-select
      v-model='bizObjList'
      :filter-model='filter'
      multiple
      dialog-title='选择'
      :fetch-data='fetchData'
      :table-data-disabled='tableDataDisabled'
      :disabled-reason='disabledReason'
      formate='name'
      row-key='ida'
      clearable
      reserve-selection
    >
      <template #filter-content>
        <form-grid-item label='名称' prop='name'>
          <template #default>
            <el-input
              v-model='filter.name'
              placeholder='请输入'
              multiple />
          </template>
        </form-grid-item>
        <form-grid-item label='编号' prop='code'>
          <template #default>
            <el-input
              v-model='filter.code'
              placeholder='请输入'
              multiple />
          </template>
        </form-grid-item>
      </template>
      <template #table-content>
        <el-table-column
          prop='name'
          label='名称'
          min-width='130'
          show-overflow-tooltip />
        <el-table-column
          prop='code'
          label='编号'
          min-width='130'
          show-overflow-tooltip />
      </template>
    </pro-biz-select>
    当前选中：{{ bizObjList }}
  </div>
</template>

<script setup lang="ts">
import { ProBizSelect } from '@/index.ts';
import { ref } from 'vue';
import { FormGridItem } from 'lc-vue-form-filter';

const filter = ref({
  name: null,
  code: null 
});

const bizObj = ref({
  'id': 3,
  'name': '小张',
  'code': 'xiaozahng',
  'state': 'ING',
  'enabled': 1 
});
const bizObjList = ref([]);

const fetchData = async ({ pageNo, pageSize } = {}) => {
  console.log('分页参数');
  console.log(pageNo);
  console.log(pageSize);
  return {
    list: [
      {
        ida: `${pageNo}-1`,
        name: '小明',
        code: 'xiaoming',
        state: 'ING',
        enabled: 0
      },
      {
        ida: `${pageNo}-2`,
        name: '小李',
        code: 'xiaoli',
        state: 'ING',
        enabled: 1
      },
      {
        ida: `${pageNo}-3`,
        name: '小张',
        code: 'xiaozahng',
        state: 'ING',
        enabled: 1
      },
      {
        ida: `${pageNo}-4`,
        name: '小王',
        code: 'xiaowang',
        state: 'CLOSE',
        enabled: 1
      }
    ],
    total: 200
  };
};
// let res = await api.mdf.getProcessTemplate({ query: { templateName: filterData.value.templateName } });

const tableDataDisabled = (row) => row.enabled === 0 || row.state === 'CLOSE';

const disabledReason = (row) => {
  if (!row.enabled) {
    return '已禁用';
  }
  if (row.state === 'CLOSE') {
    return '已关闭';
  }
  return '';
};
</script>

<style scoped>

</style>