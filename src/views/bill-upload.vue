<script setup lang="ts">
import router from '@/router';
import { reactive } from 'vue';
import UploadFile from '@/components/upload-file.vue'
import { read, utils } from 'xlsx'
import { useBillStore } from '@/stores/bill';

let tableData: { name: string, _data: object[] }[] = reactive([])

/** excel 日期转换  */
const excel_date_to_string = (value: number) => {
  const date = new Date((value - 2) * 24 * 3600000 + 1)
  date.setFullYear(date.getFullYear() - 70)
  date.setHours(date.getHours() - 8)
  return date.toLocaleDateString()
}

/** 导入 */
const handleUpload = async (file: File) => {
  const data = await file.arrayBuffer()
  const workbook = read(data)
  console.log(workbook)
  const sheet = workbook.SheetNames
  let file_data: any = []
  let table_data: any = []
  for (let i = 0; i < sheet.length - 1; i++) {
    file_data = utils.sheet_to_json(workbook.Sheets[sheet[i]], { header: 3 })
    file_data = file_data.slice(2)
    for (let r = 0; r < file_data.length; r++) {
      const file_data_row = file_data[r]
      const table_row_key_config: Record<string, string> = {
        '序号': 'id',
        '时间': 'createTime',
        '商品名称': 'productName',
        '单价': 'price',
        '数量': 'num',
        '单位': 'unit',
        '折扣': 'discount',
        '商品类型': 'productType',
        '支付方式': 'payType',
        '金额': 'sum'
      }
      const file_data_row_keys = Object.keys(file_data_row)
      const table_row: Record<string, string> = {}
      file_data_row_keys.forEach(key => {
        const table_row_key = table_row_key_config[key]
        if (table_row_key) {
          if (table_row_key === 'id') {
            table_row[table_row_key] = i + '_' + r
          } else if (table_row_key === 'createTime') {
            table_row[table_row_key] = excel_date_to_string(file_data_row[key])
          } else {
            table_row[table_row_key] = file_data_row[key]
          }
        }
      })
      useBillStore().data.push(table_row)
      table_data.push(table_row)
    }
  }
  console.log(table_data)
  tableData.push({ name: file.name, _data: file_data })
}
/** 查看 */
const handleInfo = (index: number) => {
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