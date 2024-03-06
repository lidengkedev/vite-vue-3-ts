<script setup lang="ts">
import { reactive } from 'vue';

let tableData: { name: string }[] = reactive([])
tableData.push({ name: 'xxxxxxxxxxx' })
</script>

<template>
  <div class="app-container">
    <div class="table-warpper">
      <div class="table-header-warpper">
        <table class="table-header-inner">
          <colgroup>
            <col width="60">
            <col width="100">
            <col width="100">
          </colgroup>
          <tr>
            <th>序号</th>
            <th>名称</th>
            <th>价格</th>
            <th>日期</th>
            <th>备注</th>
          </tr>
        </table>
      </div>
      <div class="table-body-warpper">
        <table class="table-body-inner">
          <colgroup>
            <col width="60">
            <col width="100">
            <col width="100">
          </colgroup>
          <tr v-for="(item, index) in tableData" :key="index">
            <td align="center">{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  padding: 20px;
  width: calc(100% - 200px);
}
.form-warpper {
  margin-bottom: 20px;
}
.form-warpper .form-item .import-btn {
  width: 80px;
}
.table-warpper {
  width: 100%;
}
.table-header-warpper {
  width: 100%;
}
.table-header-inner {
  width: 100%;
}
.table-body-warpper {
  width: 100%;
}
.table-body-inner {
  width: 100%;
}
.table-body-warpper {
  height: 75vh;
}
</style>