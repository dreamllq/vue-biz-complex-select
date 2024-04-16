import { PropType } from 'vue';
import { ElTable } from 'element-plus';

export default {
  modelValue: {
    type: Object as PropType<{id:any} | {id:any}[]>,
    default: () => ({})
  },
  multiple: {
    type: Boolean,
    default: false
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
    type: Function,
    default: () => (false)
  },
  disabledReason: {
    type: Function,
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