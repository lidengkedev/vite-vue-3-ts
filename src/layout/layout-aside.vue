<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import type {  IMenuItem } from '@/stores/user'
import { useRoute } from 'vue-router'
import router from '@/router';
const menu = useUserStore().menu
const route = useRoute()
const path = computed(() => route.path)

const handleLink = (item: IMenuItem) => {
  router.push(item.url)
}
</script>

<template>
  <div class="aside">
    <div class="user">
      <div class="icon-user"></div>
      <div class="user-info">
        <div class="username">归海一刀</div>
        <div class="email">guihaiyidao@email.com</div>
      </div>
    </div>
    <div class="menu">
      <div
        v-for="(item, index) in menu"
        :key="index"
        :class="{ 'menu-item': true, 'is-active': item.url === path }"
        @click="handleLink(item)">{{ item.name }}</div>
    </div>
    <div class="footer">
      <div class="logout">退出</div>
    </div>
  </div>
</template>

<style scoped>
.aside {
  width: 200px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  color: #FFF;
  background-color: #2d363a;
}
/* 灰色背景：#f6f6f6 */
/* 按钮颜色-蓝色：#4193eb */
/* 按钮颜色-灰色：#f0f1f4 */
/* 字体颜色-蓝色：#3273eb */
/* 表格表头背景-灰色：#f2f2f2 */
/* 边框颜色-灰色：#c9cdd6 */
.user {
  padding: 40px 10px;
  border-bottom: 1px solid #FFF;
}
.user .icon-user {
  display: inline-block;
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f0f1f4;
}
.user .user-info {
  display: inline-block;
  vertical-align: middle;
}
.user .user-info {
  margin-left: 10px;
}
.user .username,
.user .email {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 120px;
}
.menu {
  margin-top: 20px;
  height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.menu-item {
  padding: 10px 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
}
.menu-item.is-active,
.menu-item:hover {
  color: #5298d6;
  background-color: #20272c;
}
.footer .logout {
  padding: 10px 20px;
  cursor: pointer;
}
.footer .logout:hover {
  color: #5298d6;
  background-color: #20272c;
}
</style>