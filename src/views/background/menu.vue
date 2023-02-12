<!-- eslint-disable space-before-function-paren -->
<template>
  <el-card class="box-card">
    <PageTools>
      <template #right>
        <el-button
          size="small"
          type="success"
          icon="el-icon-edit"
          @click="showMenuDialog = true"
        >
          添加菜单
        </el-button>
      </template>
    </PageTools>
    <!-- 表格 -->
    <!-- 表格 -->
    <!-- 指定id为唯一属性的标识 -->
    <!-- row-key 渲染树形数据必须设置 -->
    <el-table ref="menutable" :data="list" row-key="id">
      <el-table-column label="标题" prop="title" width="200px" />
      <el-table-column label="权限点代码" prop="code" />
      <el-table-column label="操作" width="120px">
        <template #default="{ row }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            circle
            @click="MenuEdit(row.id)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            circle
            @click="MenuDelete(row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
    <MenuEdit
      ref="menuEdit"
      :show-menu-dialog.sync="showMenuDialog"
      @render="getMenuList"
    />
  </el-card>
</template>

<script>
import { getMenuListApi, DelMenuListApi } from '@/api/menu'
import { tranListToTreeData } from '@/utils/index' // 递归
import MenuEdit from './component/menu-edit.vue'
export default {
  components: { MenuEdit },
  data() {
    return {
      list: [], // 菜单列表
      showMenuDialog: false
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    // 菜单编辑
    MenuEdit(id) {
      this.$refs.menuEdit.getMenuDetail(id)
      this.showMenuDialog = true
    },
    // 菜单删除
    MenuDelete(id) {
      this.$confirm('确认删除吗？', {
        confirmButtonText: '删除',
        cancelButtonText: '取消'
        // eslint-disable-next-line space-before-function-paren
      }).then(async () => {
        await DelMenuListApi(id)
        this.getMenuList()
        this.$message.success('删除用户成功')
      })
    },

    async getMenuList() {
      // const list = await getMenuListApi()
      const data = tranListToTreeData(await getMenuListApi(), null)
      data.forEach((item) => {
        item.children = item.childs
        item.childs?.forEach((obj) => {
          obj.children = obj.points
        })
      })
      this.list = data
    }
  }
}
</script>

<style lang="scss" scoped></style>
