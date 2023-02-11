<template>
  <!-- 左侧 -->
  <!-- 通过 $slots 可以拿到所有的插槽列表,  `$slot.插槽名`  可以用于判断该插槽是否传值 -->
  <el-alert type="info" :closable="false" class="alert">
    <i class="el-icon-info" />
    <slot name="message" />
  </el-alert>
</template>

<script>
export default {
  name: 'Message'
}
</script>

<style lang="scss" scoped>
.alert {
  margin-bottom: 20px;
}
.el-icon-info {
  width: 20px;
  font-size: 15px;
}
</style>
