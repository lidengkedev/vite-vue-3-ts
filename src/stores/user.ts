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
    { id: 2, name: '账单管理', url: '/bill', children: [] },
    { id: 3, name: '关于', url: '/about', children: [] }
  ])
  return { menu }
})