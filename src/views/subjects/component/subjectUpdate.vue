<template>
  <el-dialog
    :visible="showDialog"
    :title="dialogName"
    width="400px"
    @close="closeDialog"
  >
    <el-form
      ref="subjectFrom"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="学科名称" prop="subjectName">
        <el-input v-model="formData.subjectName" style="width: 90%" />
      </el-form-item>
      <el-form-item label="是否显示" prop="isFrontDisplay">
        <el-switch
          v-model="formData.isFrontDisplay"
          :active-value="1"
          :inactive-value="0"
          active-color="#13ce66"
          inactive-color="#ff4949"
          style="width: 90%"
        />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col>
          <el-button size="middle" @click="closeDialog">取消</el-button>
          <el-button type="primary" size="middle" @click="btnOk">
            确定
          </el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import {
  AddSubjectApi,
  getsubjectDetailApi,
  editsubjectApi
} from '@/api/subject'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        isFrontDisplay: 1, // 是否启用
        subjectName: '' // 学科名称
      },
      rules: {
        subjectName: [
          { required: true, message: '学科名字不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    dialogName() {
      return this.formData.id ? '编辑用户' : '新增用户'
    }
  },
  methods: {
    // 关闭弹层|取消
    closeDialog() {
      this.formData = {
        isFrontDisplay: 1, // 是否启用
        subjectName: '' // 学科名称
      }
      this.$emit('update:showDialog', false)
    },
    // 点击确定
    btnOk() {
      // eslint-disable-next-line space-before-function-paren
      this.$refs.subjectFrom.validate(async (isok) => {
        if (isok) {
          if (this.formData.id) {
            await editsubjectApi(this.formData)
            this.$message.success('编辑成功')
          } else {
            await AddSubjectApi(this.formData)
            this.$message.success('添加成功')
          }
          this.$emit('updateList')
          this.closeDialog()
        }
      })
    },
    // 回显数据
    async getsubjectDetail(id) {
      this.formData.id = ''
      const data = await getsubjectDetailApi(id)
      for (const key in this.formData) {
        this.formData[key] = data[key]
      }
      console.log(this.formData)
    }
  }
}
</script>

<style></style>
