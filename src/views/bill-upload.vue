<script setup lang="ts">
import router from '@/router';
import { reactive } from 'vue';
import UploadFile from '@/components/upload-file.vue'

let tableData: { name: string }[] = reactive([])

/** 导入 */
const handleUpload = (file: File) => {
  tableData.push({ name: file.name })
}
/** 查看 */
const handleInfo = (index: number) => {
  alert('查看:' + index)
  router.push({ path: '/detail', query: { id: index } })
}
/** 删除 */
const handleDelete = (index: number) => {
  tableData.splice(index, 1)
}
</script>

<template>
  <div class="report-import">
    <div class="form-warpper">
      <div class="form-item">
        <!-- <input type="file" name="">
        <button data-type="primary" @click="handleImport">导入</button> -->
        <upload-file accept=".xlsx,.xls" @on-upload="handleUpload"></upload-file>
      </div>
    </div>
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
            <th>操作</th>
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
            <td align="center">
              <button data-type="text" @click="handleInfo(index)">查看</button>
              <button data-type="text" @click="handleDelete(index)">删除</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.report-import {
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