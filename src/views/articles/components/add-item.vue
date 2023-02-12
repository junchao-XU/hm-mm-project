<template>
  <Dialog
    title="新增文章"
    :show-dialog.sync="showDialog"
    @close="close"
    @click-ok="submitRole()"
  >
    <el-form ref="roleForm" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题" />
      </el-form-item>
      <el-form-item label="文章内容" prop="articleBody">
        <el-input
          v-model="form.articleBody"
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="视频地址" prop="videoURL">
        <el-input v-model="form.videoURL" placeholder="请输入视频地址" />
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import {
  ArticleEditorApi,
  ArticleDetailsApi,
  ArticleModificationApi
} from '@/api/articles'
export default {
  props: {
    showDialog: { type: Boolean, default: false }
  },
  data() {
    return {
      form: {
        title: '', // 文章标题
        articleBody: '', // 文章内容
        videoURL: '', // 视频地址
        id: '', // 序号
        visits: '', // 阅读数
        username: '', // 录入人
        createTime: '', // 录入时间
        state: false // 状态
      },
      rules: {
        title: [
          {
            required: true,
            message: '文章标题不能为空',
            trigger: ['blur', 'change']
          }
        ],
        articleBody: [
          {
            required: true,
            message: '文章内容不能为空',
            trigger: ['blur', 'change']
          }
        ]
      },
      textarea: ''
    }
  },
  created() {},
  methods: {
    // 关闭
    close() {
      this.$emit('update:showDialog', false)
      // 关闭弹层后清空数据
      this.form = {
        title: '', // 文章标题
        articleBody: '', // 文章内容
        videoURL: '', // 视频地址
        id: '', // 序号
        visits: '', // 阅读数
        username: '', // 录入人
        createTime: '', // 录入时间
        state: false // 状态
      }
    },
    // 发起请求添加文章
    // async submitRole() {
    //   this.$refs.roleForm = await ArticleEditorApi(this.form)
    // }
    submitRole() {
      // eslint-disable-next-line space-before-function-paren
      this.$refs.roleForm.validate(async (flag) => {
        if (!flag) return

        if (this.form.id) {
          // 有id编辑文本
          await ArticleModificationApi(this.form)
          this.$message.success('编辑文章成功')
        } else {
          // 没有id，新增角色
          await ArticleEditorApi(this.form)
          this.$message.success('添加文章成功')
        }

        // 添加成功后关闭弹层
        this.close()
        // 重新渲染数据
        this.$parent.biaodan()
      })
    },
    // 编辑的方法数据回显 点击查看编辑
    async ArticleDetails(id) {
      this.form = await ArticleDetailsApi(id)
    }
  }
}
</script>

<style></style>
