<script setup lang="ts">
import { ref } from 'vue'
let filename = ref('请选择上传文件！')
const file = ref()

const emit = defineEmits(['on-upload'])

/** 文件上传 */
const handleUpload = () => {
  file.value.click()
  file.value.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement
    let file
    if (target.files) {
      file = target.files[0]
    }
    if (file) {
      filename.value = file.name
      emit('on-upload', file)
    }
    target.value = ''
  }
}
/** 清除文件名 */
const handleClose = () => {
  filename.value = '请选择上传文件！'
}
</script>

<template>
  <div class="upload-inner">
    <div class="file-name">{{ filename }}<span class="icon-close" @click="handleClose">&times;</span></div>
    <button data-type="primary" class="upload-btn" @click="handleUpload">文件上传</button>
  </div>
  <input ref="file" type="file" hidden>
</template>

<style scoped>
.upload-inner {
  /* width: 200px; */
  display: inline-block;
  border: 1px solid var(--button-color);
  border-radius: 5px;
}
.upload-inner .file-name {
  position: relative;
  width: 200px;
  padding: 5px 10px;
  padding-right: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
}
.upload-inner .file-name:hover .icon-close {
  opacity: 1;
}
.upload-inner .file-name .icon-close {
  position: absolute;
  right: 10px;
  top: 8px;
  width: 20px;
  height: 20px;
  border: 1px solid var(--button-color);
  border-radius: 50%;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  opacity: 0;
}
.upload-inner .upload-btn {
  /* width: 60px; */
  border-color: transparent;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 1px solid var(--button-color);
  display: inline-block;
  vertical-align: middle;
}
</style>