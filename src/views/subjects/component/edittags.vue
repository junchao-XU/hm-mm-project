<template>
  <el-dialog
    :visible="showDialog"
    :title="dialogName"
    width="400px"
    @close="closeDialog"
  >
    <el-form
      ref="directoryFrom"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="所属学科" prop="isFrontDisplay">
        <el-select v-model="formData.subjectID" placeholder="请选择">
          <el-option
            v-for="item in list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="目录名称" prop="tagName">
        <el-input v-model="formData.tagName" style="width: 80%" />
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
import { getsubjectSimpleDetailApi } from '@/api/subject'
import { editTagsApi, addTagsApi, gettagsDetaliApi } from '@/api/tags'

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
        subjectID: 1, // 所属学科
        tagName: '' // 学科名称
      },
      list: [], // 学科列表
      subject: '',
      rules: {
        tagName: [{ required: true, message: '目录不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    dialogName() {
      return this.formData.id ? '修改目录' : '新增目录'
    }
  },
  methods: {
    // 关闭弹层|取消
    closeDialog() {
      this.formData = {
        subjectID: 1, // 所属学科
        tagName: '' // 学科名称
      }
      this.$emit('update:showDialog', false)
    },
    // 点击确定
    btnOk() {
      // eslint-disable-next-line space-before-function-paren
      this.$refs.directoryFrom.validate(async (isok) => {
        if (isok) {
          if (this.formData.id) {
            await editTagsApi(this.formData)
            this.$message.success('编辑成功')
          } else {
            await addTagsApi(this.formData)
            this.$message.success('添加成功')
          }
          this.$emit('updateList')
          this.closeDialog()
        }
      })
    },
    // 回显数据
    async gettagsDetali(id) {
      this.formData.id = ''
      const data = await gettagsDetaliApi(id)
      for (const key in this.formData) {
        this.formData[key] = data[key]
      }
      console.log(this.formData)
    },
    async getDirectorSimple() {
      const data = await getsubjectSimpleDetailApi()
      console.log(data)
      this.list = data
    }
  }
}
</script>

<style></style>
