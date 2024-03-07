import { reactive } from 'vue'
import { defineStore } from 'pinia'

export interface ITableRow {
  id: number,
  createTime: string,
  productName: string,
  price: number,
  num: number,
  unit: number,
  discount: number,
  productType: number,
  payType: number,
  sum: number,
  remark: string
}

export const useBillStore = defineStore('bill', () => {
  const data: ITableRow[] & Record<string, string>[] = reactive([])
  return { data }
})