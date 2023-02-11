<template>
  <Dialog title="创建表单" :show-dialog.sync="showDialog" @close="close">
    表单
  </Dialog>
</template>

<script>
export default {
  props: {
    showDialog: { type: Boolean, default: false } // 显示隐藏
  },
  data() {
    return {}
  },
  methods: {
    // 关闭
    close() {
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style>

</style>
