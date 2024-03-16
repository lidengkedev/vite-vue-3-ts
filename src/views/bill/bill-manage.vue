<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import CompDialog from '@/components/comp-dialog.vue'

interface ITableItem {
  id: number,
  date: string,
  productName: string,
  price: number,
  num: number,
  unit: string,
  discount: number,
  productType: number,
  payType: number,
  sum: number,
  remark: string
}

let search = ref({ name: '', startDate: '', endDate: '', remark: '' })
let form = ref({
  id: 0,
  date: '',
  productName: '', 
  price: 0,
  num: 0,
  unit: '',
  discount: 0,
  productType: 1,
  payType: 1,
  sum: 0,
  remark: ''
})
let tableData: ITableItem[] = reactive([])
const is_show_dialog = ref(false)
const form_type = ref('add')

let totalPrice = ref(0)
let sumTotal = ref(0)
/** 监听 表格变化 */
watch(tableData, (newVal) => {
  totalPrice.value = 0
  sumTotal.value = 0
  newVal.map((item) => {
    totalPrice.value = totalPrice.value + Number(item.price)
    sumTotal.value = sumTotal.value + Number(item.sum)
    return item
  })
  totalPrice.value = Number(totalPrice.value.toFixed(2))
  sumTotal.value = Number(sumTotal.value.toFixed(2))
})

/** 查询 */
const handleSearch = () => {
  console.log(search)
}
/** 重置按钮 */
const handleReset = () => {
  search.value.name = ''
  search.value.startDate = ''
  search.value.endDate = ''
  search.value.remark = ''
}
/** 新增 */
const handleAdd = () => {
  is_show_dialog.value = true
  form_type.value = 'add'
}
/** 更新弹框状体 */
const handleUpdate = (value: boolean) => {
  is_show_dialog.value = value
}
/** 弹框 确认 */
const handleSure = () => {
  is_show_dialog.value = false
  if (form_type.value === 'add') {
    // 不能直接赋值，否则tableData的所有行数据的引用地址变成同一个，改一行数据，所有行都会改变
    tableData.push({...form.value, id: Date.now()})
  } if (form_type.value === 'edit') {
    tableData[tableData.findIndex(v => v.id === form.value.id)] = {...form.value}
  }
}
/** 弹框 取消 */
const handleCancel = () => {
  is_show_dialog.value = false
}
/** 修改 */
const handleEdit = (row: ITableItem) => {
  form.value.productName = row.productName
  form.value.price = row.price
  form.value.date = row.date
  form.value.remark = row.remark
  form.value.id = row.id
  is_show_dialog.value = true
  form_type.value = 'edit'
}
/** 删除 */
const handleDelete = (row: ITableItem, index: number) => {
  tableData.splice(index, 1)
}
// 导出
const handleExport = () => {
  alert('导出')
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
          <!-- <input v-model="search.year" type="text" class="year" placeholder="请输入">
          <input v-model="search.month" type="text" class="month" placeholder="请输入">
          <input v-model="search.day" type="text" class="day" placeholder="请输入"> -->
          <input v-model="search.startDate" type="date" name="" id="">
          <span>-</span>
          <input v-model="search.endDate" type="date" name="" id="">
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
        <button data-type="primary" class="search" @click="handleExport">导出</button>
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
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="100">
          <col width="100">
        </colgroup>
        <tr>
          <th>序号</th>
          <th>日期</th>
          <th>商品名称</th>
          <th>单价（元）</th>
          <th>数量</th>
          <th>单位</th>
          <th>折扣</th>
          <th>商品类型</th>
          <th>支付方式</th>
          <th>金额</th>
          <th>备注</th>
          <th>操作</th>
        </tr>
      </table>
      <div class="table-body__warpper">
        <table border="1" class="table-body">
          <colgroup>
            <col width="60">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
          </colgroup>
          <tr v-for="(td, index) in tableData" :key="index">
            <td align="center">{{ index + 1 }}</td>
            <td align="center">{{ td.date }}</td>
            <td>{{ td.productName }}</td>
            <td align="right">{{ td.price }}</td>
            <td align="right">{{ td.num }}</td>
            <td align="right">{{ td.unit }}</td>
            <td align="right">{{ td.discount }}</td>
            <td align="right">{{ td.productType }}</td>
            <td align="right">{{ td.payType }}</td>
            <td align="right">{{ td.sum }}</td>
            <td>{{ td.remark }}</td>
            <td>
              <button data-type="text" @click="handleEdit(td)">修改</button>
              <button data-type="text" @click="handleDelete(td, index)">删除</button>
            </td>
          </tr>
        </table>
      </div>
      <div class="table-footer__warpper">
        <table border="1" class="table-body">
          <colgroup>
            <col width="60">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
          </colgroup>
          <tr>
            <td align="center">合计</td>
            <td>-</td>
            <td>-</td>
            <td align="right">{{ totalPrice }}</td>
            <td align="center">-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td align="right">{{ sumTotal }}</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </table>
      </div>
    </div>
    <comp-dialog :visiable="is_show_dialog" title="新增" width="40%" @update:visiable="handleUpdate">
      <div class="form-warpper">
        <div class="form-inner date">
          <div class="form-label">日期</div>
          <div class="form-item">
            <input v-model="form.date" type="date">
          </div>
        </div>
        <div class="form-inner">
          <div class="form-label">名称</div>
          <div class="form-item">
            <input v-model="form.productName" type="text">
          </div>
        </div>
        <div class="form-inner price">
          <div class="form-label">价格</div>
          <div class="form-item">
            <input v-model.number="form.price" type="number">
          </div>
        </div>
        <div class="form-inner date">
          <div class="form-label">数量</div>
          <div class="form-item">
            <input v-model="form.num" type="number">
          </div>
        </div>
        <div class="form-inner date">
          <div class="form-label">单位</div>
          <div class="form-item">
            <input v-model="form.unit" type="text">
          </div>
        </div>
        <div class="form-inner date">
          <div class="form-label">折扣</div>
          <div class="form-item">
            <input v-model="form.discount" type="number">
          </div>
        </div>
        <div class="form-inner date">
          <div class="form-label">商品类型</div>
          <div class="form-item">
            <input v-model="form.productType" type="text">
          </div>
        </div>
        <div class="form-inner date">
          <div class="form-label">支付方式</div>
          <div class="form-item">
            <input v-model="form.payType" type="text">
          </div>
        </div>
        <div class="form-inner date">
          <div class="form-label">金额</div>
          <div class="form-item">
            <input v-model="form.sum" type="number">
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
.table-body__warpper {
  height: 70vh;
  overflow: hidden auto;
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