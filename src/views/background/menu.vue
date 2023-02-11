<template>
  <el-card class="box-card">
    <PageTools>
      <template #right>
        <el-button
          size="small"
          type="success"
          icon="el-icon-edit"
          @click="showDialog = true"
        >
          添加菜单
        </el-button>
      </template>
    </PageTools>
    <!-- 表格 -->
    <!-- 表格 -->
    <!-- 指定id为唯一属性的标识 -->
    <!-- row-key 渲染树形数据必须设置 -->
    <el-table border :data="list" row-key="id">
      <el-table-column label="标题" prop="title" width="200px" />
      <el-table-column label="权限点代码" prop="code" width="938px" />
      <el-table-column label="操作" width="120px">
        <template #default="{ row }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="MenuEdit(row.id)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="MenuDelete(row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getMenuListApi } from '@/api/menu'
import { tranListToTreeData } from '@/utils/index' // 递归
export default {
  data() {
    return {
      list: [] // 菜单列表
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 菜单编辑
    MenuEdit() {},
    // 菜单删除
    MenuDelete() {},
    async getUserList() {
      // const list = await getMenuListApi()
      const data = tranListToTreeData(await getMenuListApi(), null)
      data.forEach((item) => {
        item.children = item.childs
        item.childs?.forEach((obj) => {
          obj.children = obj.points
        })
      })
      this.list = data
      console.log('处理完后的', data)
    }
  }
}
</script>

<style lang="scss" scoped></style>
