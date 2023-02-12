<template>
  <Dialog title="题目审核" :show-dialog.sync="showDialog" width="22%" @close="close" @click-ok="commit">
    <el-form :model="formDate">
      <el-form-item>
        <el-radio v-model="formDate.chkState" :label="1">通过</el-radio>
        <el-radio v-model="formDate.chkState" :label="2">拒绝</el-radio>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formDate.chkRemarks" type="textarea" placeholder="请输入审核意见" />
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import { ChangeAuditApi } from '@/api/questions'
export default {
  props: {
    showDialog: { type: Boolean, default: false }
  },
  data() {
    return {
      formDate: {
        chkState: 1, // 状态
        chkRemarks: '', // 审核意见
        id: 0
      }
    }
  },
  methods: {
    // 关闭
    close() {
      this.formDate = {}
      this.$emit('update:showDialog', false)
    },
    // 提交
    async commit() {
      if (this.formDate.chkRemarks.trim() === '') return this.$message.warning('请输入审核意见')
      await ChangeAuditApi(this.formDate)
      this.$emit('getSelectList')
      this.$message.success('操作成功')
      this.close()
    }
  }
}
</script>

<style>

</style>
