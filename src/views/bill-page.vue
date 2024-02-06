<script setup lang="ts">
import { reactive, ref } from 'vue'
import CompDialog from '@/components/comp-dialog.vue'

interface ITableItem {
  name: string,
  price: number | string,
  date: string,
  remark: string
}

let search = reactive({ name: '', year: '', month: '', day: '', remark: '' })
let form = reactive({ name: '', price: '', date: '', remark: '' })
let tableData: ITableItem[] = reactive([])
const handleSearch = () => {
  console.log(search)
}
const is_show_dialog = ref(false)
const handleReset = () => {
  search.name = ''
  search.year = ''
  search.month = ''
  search.day = ''
  search.remark = ''
}
const handleAdd = () => {
  is_show_dialog.value = true
}
const handleUpdate = (value: boolean) => {
  is_show_dialog.value = value
}
const handleSure = () => {
  is_show_dialog.value = false
  tableData.push(form)
}
const handleCancel = () => {
  is_show_dialog.value = false
}
const handleEdit = (row: ITableItem) => {
  form.name = row.name
  form.price = String(row.price)
  form.date = row.date
  form.remark = row.remark
  is_show_dialog.value = true
}
const handleDelete = (row: ITableItem, index: number) => {
  tableData.splice(index, 1)
}
</script>

<template>
  <div class="bill">
    <div class="header-title">账单管理</div>
    <div class="search-warpper">
      <div class="search-inner">
        <div class="search-title">名称</div>
        <div class="search-input">
          <input v-model="search.name" type="text" placeholder="请输入">
        </div>
      </div>
      <div class="search-inner">
        <div class="search-title">日期</div>
        <div class="search-input">
          <input v-model="search.year" type="text" class="year" placeholder="请输入">
          <input v-model="search.month" type="text" class="month" placeholder="请输入">
          <input v-model="search.day" type="text" class="day" placeholder="请输入">
        </div>
      </div>
      <div class="search-inner">
        <div class="search-title">备注</div>
        <div class="search-input">
          <input v-model="search.remark" type="text" placeholder="请输入">
        </div>
      </div>
      <div class="search-inner">
        <button data-type="primary" class="search" @click="handleSearch">查询</button>
        <button data-type="text" class="search" @click="handleReset">重置条件</button>
        <button data-type="primary" class="search" @click="handleAdd">新增</button>
      </div>
    </div>
    <div class="table-warpper">
      <table border="1" class="table-header">
        <colgroup>
          <col width="60">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="100">
        </colgroup>
        <tr>
          <th>序号</th>
          <th>名称</th>
          <th>价格</th>
          <th>日期</th>
          <th>备注</th>
          <th>操作</th>
        </tr>
      </table>
      <table border="1" class="table-body">
        <colgroup>
          <col width="60">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="100">
        </colgroup>
        <tr v-for="(td, index) in tableData" :key="index">
          <td align="center">{{ index + 1 }}</td>
          <td>{{ td.name }}</td>
          <td align="right">{{ td.price }}</td>
          <td align="center">{{ td.date }}</td>
          <td>{{ td.remark }}</td>
          <td>
            <button data-type="text" @click="handleEdit(td)">修改</button>
            <button data-type="text" @click="handleDelete(td, index)">删除</button>
          </td>
        </tr>
      </table>
    </div>
    <comp-dialog :visiable="is_show_dialog" title="新增" width="40%" @update:visiable="handleUpdate">
      <div class="form-warpper">
        <div class="form-inner">
          <div class="form-label">名称</div>
          <div class="form-item">
            <input v-model="form.name" type="text">
          </div>
        </div>
        <div class="form-inner price">
          <div class="form-label">价格</div>
          <div class="form-item">
            <input v-model="form.price" type="text">
          </div>
        </div>
        <div class="form-inner date">
          <div class="form-label">日期</div>
          <div class="form-item">
            <input v-model="form.date" type="text">
          </div>
        </div>
        <div class="form-inner remark">
          <div class="form-label">备注</div>
          <div class="form-item">
            <textarea v-model="form.remark" rows="5"></textarea>
          </div>
        </div>
      </div>
      <template v-slot:footer>
        <button data-type="primary" @click="handleSure">确定</button>
        <button data-type="text" @click="handleCancel">取消</button>
      </template>
    </comp-dialog>
  </div>
</template>

<style scoped>
.bill {
  padding: 20px;
  width: calc(100% - 200px);
}
.header-title {
  margin-bottom: 10px;
}
.search-warpper .year,
.search-warpper .month,
.search-warpper .day {
  width: 100px;
}
.search-warpper .year,
.search-warpper .month {
  margin-right: 10px;
}
.table-header,
.table-body {
  width: 100%;
}
.form-warpper .form-inner {
  margin-bottom: 20px;
  width: 100%;
}
.form-warpper .form-inner.price,
.form-warpper .form-inner.date {
  width: 50%;
  display: inline-block;
  vertical-align: middle;
}
.form-warpper .form-label {
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}
.form-warpper .form-item {
  display: inline-block;
  vertical-align: middle;
  width: calc(100% - 60px);
}
.form-warpper input,
.form-warpper textarea {
  width: 100%;
}
.form-warpper .form-inner.remark .form-label {
  vertical-align: top;
}
</style>