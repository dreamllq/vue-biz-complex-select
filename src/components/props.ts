import { PropType } from 'vue';
import { ElTable } from 'element-plus';

type DataRow = any;

export default {
  modelValue: {
    type: Object as PropType<Record<string, any> | Record<string, any>[]>,
    default: () => ({})
  },
  multiple: {
    type: Boolean,
    default: false
  },
  multipleLine: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  dialogTitle: {
    type: String,
    default: ''
  },
  dialogWidth: {
    type: String,
    default: '1008px'
  },
  filterModel: {
    type: Object,
    default: () => ({})
  },
  fetchData: {
    type: Function,
    default: () => ({
      list: [],
      total: 0 
    })
  },
  reserveSelection: {
    type: Boolean,
    default: false
  },
  noPagination: {
    type: Boolean,
    default: false
  },
  tableDataDisabled: {
    type: Function as PropType<(row:DataRow) => boolean>,
    default: () => (false)
  },
  disabledReason: {
    type: Function as PropType<(row:DataRow) => string>,
    default: () => ('')
  },
  formate: {
    type: String,
    default: 'id'
  },
  rowKey: {
    type: String,
    default: 'id'
  },
  clearable: {
    type: Boolean,
    default: false
  },
  formGrid: {
    type: Object as PropType<{showAll?:boolean, foldShowLine: number}>,
    default: () => ({})
  },
  pagination: {
    type: Object as PropType<{pageSizes?:number[], defaultPageSize?:number, noPagination?: boolean}>,
    default: () => ({})
  },
  table: {
    type: Object as PropType<InstanceType<typeof ElTable>['$props']>,
    default: () => ({})
  }
};