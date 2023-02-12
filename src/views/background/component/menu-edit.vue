<template>
  <!-- 新增和编辑弹层 -->
  <el-dialog :visible="showMenuDialog" :title="showText" @close="closeDialog">
    <!-- 表单 -->
    <el-form
      ref="permFrom"
      :model="formData"
      :rules="rules"
      label-width="120px"
      border
    >
      <el-form-item label="权限组名称" prop="is_point" label-width="200px">
        <el-radio-group v-model="formData.is_point">
          <el-radio :label="true" :disabled="value()">菜单</el-radio>
          <el-radio :label="false" :disabled="value()">权限点</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限组名称" label-width="200px">
        <el-select
          ref="deptSelect"
          v-model="formData.titles"
          placeholder="请选择部门"
          style="width: 50%"
          @focus="getMenuList"
        >
          <el-option style="padding: 0" value="" class="treeOption">
            <el-tree
              default-expand-all
              :data="treeData"
              :props="defaultProps"
              @node-click="nodeClick"
            />
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限代码" prop="code" label-width="200px">
        <el-input v-model="formData.code" style="width: 50%" />
      </el-form-item>
      <el-form-item label="权限标题" label-width="200px" prop="title">
        <el-input v-model="formData.title" style="width: 50%" />
      </el-form-item>
    </el-form>
    <!-- 底部的确认和取消 -->
    <el-row slot="footer" type="flex" justify="end">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="closeDialog">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {
  getMenuListApi,
  addMenuListApi,
  getMenuDetailApi,
  editMenuDetailApi
} from '@/api/menu'
import { tranListToTreeData } from '@/utils/index' // 递归
export default {
  props: {
    showMenuDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 菜单数据
      formData: {
        code: '', // 菜单代码
        pid: 0, // 父 id
        is_point: true, // 	是否权限点
        title: '', // 菜单标题
        titles: '' // 菜单标题
      },
      treeData: [], // 权限组名称，来接受树形结构
      // value: false, // 禁用
      // 规则数组
      rules: {
        code: [
          { required: true, message: '权限代码不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '权限标题不能为空', trigger: 'blur' }
        ]
      },
      defaultProps: {
        label: 'title',
        children: 'children'
      }
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '创建菜单' : '菜单'
    }
  },

  methods: {
    value() {
      if (this.formData.id) {
        return true
      } else {
        return false
      }
    },
    // 取消
    closeDialog() {
      this.$emit('update:showMenuDialog', false)
      this.formData = {
        code: '', // 菜单代码
        pid: 0, // 父 id
        is_point: true, // 	是否权限点
        title: '' // 菜单标题
      }
    },
    // 确定
    async btnOk() {
      // eslint-disable-next-line space-before-function-paren
      this.$refs.permFrom.validate(async (isok) => {
        if (isok) {
          if (this.formData.id) {
            // 编辑
            await editMenuDetailApi(this.formData)
            this.$message.success('修改成功')
          } else {
            await addMenuListApi(this.formData)
            this.$message.success('新增成功')
          }
          this.$emit('render')
          this.closeDialog()
        }
      })
    },
    // 点击树形组件子节点
    nodeClick(data) {
      // if (data.children && data.children.length > 0) return
      this.formData.titles = data.title
      this.formData.pid = data.id
      this.$refs.deptSelect.blur() // 失去焦点
    },
    // 获取权限组名称
    async getMenuList() {
      this.showTree = true
      const data = tranListToTreeData(await getMenuListApi(), null)
      data.forEach((item) => {
        item.children = item.childs
        item.childs?.forEach((obj) => {
          obj.children = obj.points
        })
      })
      this.treeData = data
      console.log('处理完后的', this.treeData)
    },
    // 回显数据
    async getMenuDetail(id) {
      this.formData.id = ''
      const data = await getMenuDetailApi(id)
      for (const key in this.formData) {
        this.formData[key] = data[key]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.treeOption {
  overflow-y: auto;
  height: 200px;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
