<template>
  <el-dialog :title="dialogName" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="adduser" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label-width="200px" label="用户名" prop="username">
        <el-input v-model="formData.username" style="width: 50%" />
      </el-form-item>

      <el-form-item label-width="200px" label="邮箱" prop="email">
        <el-input v-model="formData.email" style="width: 50%" />
      </el-form-item>
      <el-form-item
        v-if="!formData.id"
        label-width="200px"
        label="密码"
        prop="password"
      >
        <el-input v-model="formData.password" style="width: 50%" />
      </el-form-item>
      <el-form-item label="角色" label-width="200px">
        <el-input v-model="formData.role" style="width: 50%" />
      </el-form-item>
      <el-form-item label="权限组名称" label-width="200px">
        <el-select
          v-model="formData.permission_group_id"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in group.manger"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话" label-width="200px">
        <el-input v-model="formData.phone" style="width: 50%" />
      </el-form-item>
      <el-form-item label="介绍" label-width="200px">
        <el-input
          v-model="formData.introduction"
          type="textarea"
          style="width: 50%"
        />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { addUserApi, getUserInfoDetailApi, editUserApi } from '@/api/background'
import group from '@/api/constant/user'
export default {
  props: {
    showDialog: { type: Boolean, default: false }
  },
  data() {
    return {
      group, // 常量文件夹
      // 定义表单数据
      formData: {
        role: '', // 角色
        phone: '', // 手机号
        username: '', // 姓名
        permission_group_id: '', // 权限组id,
        avatar: '', // 头像
        email: '', // 邮件,
        password: '', // 密码
        introduction: '' // 介绍
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' }
        ],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        password: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
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
    // 取消按钮
    btnCancel() {
      this.formData = {
        role: '', // 角色
        phone: '', // 手机号
        username: '', // 姓名
        permission_group_id: '', // 权限组id,
        avatar: '', // 头像
        email: '', // 邮件,
        password: '', // 密码
        introduction: '' // 介绍
      }
      this.$refs.adduser.resetFields() // 移除校验
      this.$emit('update:showDialog', false)
    },
    // 确认按钮
    btnOk() {
      // eslint-disable-next-line space-before-function-paren
      this.$refs.adduser.validate(async (isok) => {
        if (isok) {
          if (this.formData.id) {
            // 编辑
            await editUserApi(this.formData)
            this.$message.success('编辑用户成功')
          } else {
            // 新增
            await addUserApi(this.formData)
            this.$message.success('新增用户成功')
          }
          this.btnCancel()
          this.$emit('update')
        }
      })
    },
    // 回显数据
    async getUserInfoDetail(id) {
      this.formData.id = ''
      const data = await getUserInfoDetailApi(id)
      for (const key in this.formData) {
        this.formData[key] = data[key]
      }
    }
  }
}
</script>

<style></style>
