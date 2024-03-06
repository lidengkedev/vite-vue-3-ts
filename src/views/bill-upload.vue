<script setup lang="ts">
import router from '@/router';
import { reactive } from 'vue';
import UploadFile from '@/components/upload-file.vue'
import { readFile, read, utils } from 'xlsx'

let tableData: { name: string, _data: object[] }[] = reactive([])

/** 导入 */
const handleUpload = async (file: File) => {
  const data = await file.arrayBuffer()
  const workbook = read(data)
  const sheet = workbook.SheetNames
  let file_data: any = []
  let table_data: any = []
  for (let i = 0; i < sheet.length; i++) {
    file_data = utils.sheet_to_json(workbook.Sheets[sheet[i]])
    console.log(file_data)
    for (let r = 0; r < file_data.length; r++) {
      const item = file_data[r]
      let row: any = { index: r, id: '', date: '', productName: '', price: '', num: '', unit: '', sole: '', productType: '', applyType: '', total: '', remark: '' }
      if (i === 9 && r === 2) {
        // eslint-disable-next-line no-debugger
        debugger
      }
      // if (item.__EMPTY) {
      if (item['序号']) {
        row.id = item['序号']
      // } else if (item.__EMPTY_1) {
      }
      if (item['日期']) {
        row.date = item['日期']
      }
      if (item['商品名称']) {
        row.productName = item['商品名称']
      }
      if (item['单价']) {
        row.price = item['单价']
      }
      if (item['数量']) {
        row.num = item['数量']
      }
      if (item['单位']) {
        row.unit = item['单位']
      }
      if (item['折扣']) {
        row.sole = item['折扣']
      }
      if (item['商品类型']) {
        row.productType = item['商品类型']
      }
      if (item['支付方式']) {
        row.applyType = item['支付方式']
      }
      if (item['金额']) {
        row.total = item['金额']
      }
      if (item['备注']) {
        row.remark = item['备注']
      }
      if (item['月份']) {
        row.month = item['月份']
      }
      if (item.__EMPTY_12) {
        row.other12 = item.__EMPTY_12
      }
      if (item.__EMPTY_13) {
        row.other13 = item.__EMPTY_13
      }
      if (item.__EMPTY_14) {
        row.other14 = item.__EMPTY_14
      }
      if (item.__EMPTY_15) {
        row.other15 = item.__EMPTY_15
      }
      // console.log(row)
      table_data.push(row)
    }
  }
  const table_header_keys = ['序号', '日期', '商品名称', '单价', '数量', '单位', '折扣', '商品类型', '支付方式', '金额', '备注']
  console.log(table_data)
  tableData.push({ name: file.name, _data: file_data })
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