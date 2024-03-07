<script setup lang="ts">
import router from '@/router';
import { useBillStore } from '@/stores/bill';
import { computed, onMounted, reactive } from 'vue';

interface ITableItem {
  id: number,
  createTime: string,
  productName: string,
  price: number,
  num: number,
  unit: number,
  discount: number,
  productType: number,
  payType: number,
  sum: number,
  remark: string
}

let tableData: ITableItem[] = reactive([])

/** 商品金额合计 */
const productSumTotal = computed(() => {
  let sum = 0
  tableData.forEach(v => {
    sum = sum + v.sum
  })
  return sum.toFixed(2)
})

onMounted(() => {
  listenTableBodyResize()
})

tableData = reactive(useBillStore().data)

/** 返回 */
const handleBack = () => {
  router.back()
}


let observer
const callback = (entries: any) => {
  for (let entry of entries) {
    if (entry.contentBoxSize) {
      const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize
      console.log({
        inlineSize: contentBoxSize.inlineSize,
        height: entry.contentRect.height
      })
    }
  }
  const table_header_warpper = document.querySelector('.table-header-warpper')
  const table_body_warpper = document.querySelector('.table-body-warpper')
  const table_body = table_body_warpper?.querySelector('table')
  const table_body_warpper_height = table_body_warpper?.getBoundingClientRect().height
  const table_body_height = table_body?.getBoundingClientRect().height
  if (table_body_height && table_body_warpper_height && table_body_height > table_body_warpper_height) {
    // if (table_header_warpper) {
    //   table_header_warpper..style.paddingRight = '16px'
    // }
    table_body_warpper.classList.add('is-scrolling-none')
    table_header_warpper?.classList.add('is-scrolling-none')
  }
}
/** 监听表格内容区域大小变化 */
const listenTableBodyResize = () => {
  const elem = document.querySelector('.table-body-warpper table')
  observer = new ResizeObserver(callback)
  if (elem) {
    observer.observe(elem)
  }
}

</script>

<template>
  <div class="app-container">
    <div class="search-warpper">
      <button data-type="primary" @click="handleBack">返回</button>
    </div>
    <div class="table-warpper">
      <div class="table-header-warpper">
        <table class="table-header-inner">
          <colgroup>
            <col width="60">
            <col width="100">
            <col width="200">
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
          </tr>
        </table>
      </div>
      <div class="table-body-warpper">
        <table class="table-body-inner">
          <colgroup>
            <col width="60">
            <col width="100">
            <col width="200">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
          </colgroup>
          <tr v-for="(item, index) in tableData" :key="index">
            <td align="center">{{ index + 1 }}</td>
            <td>{{ item.createTime }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.num }}</td>
            <td>{{ item.unit }}</td>
            <td>{{ item.discount }}</td>
            <td>{{ item.productType }}</td>
            <td>{{ item.payType }}</td>
            <td>{{ item.sum }}</td>
            <td>{{ item.remark }}</td>
          </tr>
        </table>
      </div>
      <div class="table-footer-warpper">
        <table class="table-footer-inner">
          <colgroup>
            <col width="60">
            <col width="100">
            <col width="200">
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
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>{{ productSumTotal }}</td>
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
.search-warpper {
  margin-bottom: 20px;
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
  height: 70vh;
  overflow: hidden auto;
}
.table-header-warpper.is-scrolling-none,
.table-body-warpper.is-scrolling-none ~ .table-footer-warpper {
  padding-right: 15.4px;
}
.table-body-inner {
  width: 100%;
}
.table-footer-warpper {
  width: 100%;
}
.table-footer-inner {
  width: 100%;
}
</style>