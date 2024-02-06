<script setup lang="ts">
import { defineEmits, computed } from 'vue'
const props = defineProps({
  visiable: Boolean,
  title: String,
  width: [String, Number]
})
const emit = defineEmits(['on-click', 'on-reset', 'on-close', 'update:visiable'])
const handleSure = () => {
  emit('on-click')
  emit('update:visiable', false)
}
const handleReset = () => {
  emit('on-reset')
  emit('update:visiable', false)
}
const dialogStyle = computed(() => {
  if (typeof props.width === 'string') {
    return { width: props.width }
  } else if (typeof props.width === 'number') {
    return { width: props.width + 'px' }
  }
  return {}
})
const handleClose = () => {
  emit('on-close')
  emit('update:visiable', false)
}
</script>

<template>
  <div v-show="visiable" class="dialog-mark" @click.self="handleClose">
    <div class="dialog-warpper" :style="dialogStyle">
      <div class="dialog-header">
        <div class="dialog-title">{{ title }}</div>
        <div class="dialog-close" @click="handleClose">&times;</div>
      </div>
      <div class="dialog-body">
        <slot></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-mark {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0,0,0,0.3);
}
.dialog-warpper {
  border-radius: 10px;
  background-color: #FFF;
  margin: 0 auto;
  margin-top: 15vh;
  /* box-shadow: 0 0 5px 3px rgba(0,0,0,0.3); */
}
.dialog-header {
  position: relative;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #FAFAFA;
}
.dialog-title {
  font-size: 16px;
}
.dialog-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}
.dialog-body {
  padding: 0 20px;
}
.dialog-footer {
  padding: 0 20px 20px 20px;
  text-align: right;
}
</style>