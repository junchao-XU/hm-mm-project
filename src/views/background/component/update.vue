<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="adduser" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="用户名" prop="fullName">
        <el-input v-model="formData.fullName" style="width: 50%" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" style="width: 50%" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" style="width: 50%" />
      </el-form-item>
      <el-form-item label="角色">
        <el-input v-model="formData.role" style="width: 50%" />
      </el-form-item>
      <el-form-item label="权限组名称">
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
      <el-form-item label="联系电话">
        <el-input v-model="formData.mobile" style="width: 50%" />
      </el-form-item>
      <el-form-item label="介绍">
        <el-input
          v-model="formData.introduce"
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
import { addUserApi } from '@/api/background'
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
        account: '', // 账号
        mobile: '', // 手机号
        fullName: '', // 姓名
        permission_group_id: '', // 权限组id,
        permission_group_title: '', // 权限组名称,
        avatar: '', // 头像
        email: '', // 邮件,
        disabled: 0, // 是否屏蔽
        password: '', // 密码
        introduce: '' // 介绍
      },
      rules: {
        fullName: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' }
        ],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        password: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 取消按钮
    btnCancel() {
      // this.$refs.addEmployee.resetFields() // 移除校验
      // this.$emit('update:showDialog', false)
    },
    // 确认按钮
    btnOk() {
      this.$refs.adduser.validate(async (isok) => {
        if (isok) {
          if (this.formData.id) {
            // 编辑
            console.log()
          } else {
            // 新增
            const data = await addUserApi(this.formData)
            console.log(data)
          }
        }
      })
    }
  }
}
</script>

<style></style>
