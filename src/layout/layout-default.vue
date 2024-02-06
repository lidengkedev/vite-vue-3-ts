<script setup lang="ts">
// import { RouterView } from 'vue-router'
import LayoutAside from './layout-aside.vue'
</script>

<template>
  <div class="layout">
    <layout-aside></layout-aside>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.layout {
  height: 100%;
  display: flex;
  border-radius: 20px;
  box-shadow: 0 0 3px 1px rgba(0,0,0,0.3);
}
</style>