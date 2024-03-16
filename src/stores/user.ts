import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface IMenuItem {
  name: string,
  id: number,
  url: string,
  children?: IMenuItem[]
}

export const useUserStore = defineStore('user', () => {
  const menu = ref([
    { id: 1, name: '首页', url: '/home', children: [] },
    { id: 2, name: '账单管理', url: '/bill-manage', children: [] },
    { id: 3, name: '账单导入', url: '/bill-import', children: [] },
    { id: 4, name: '账单趋势', url: '/bill-trend', children: [] },
    { id: 5, name: '关于', url: '/about', children: [] }
  ])
  return { menu }
})