<template>
  <div class="app-container">
    <el-card class="box-card">
      <PageTools style="margin-bottom: 20px;">
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

      <!-- row-key 渲染树形数据必须设置 -->
      <el-table :data="list" row-key="id">
        <el-table-column label="标题" prop="title" width="200px">
          <template v-slot="{row}">
            <i :class="{ 'el-icon-view': !row.children }" />{{ row.title }}
          </template>
        </el-table-column>
        <el-table-column label="权限点代码" prop="code" />
        <el-table-column label="操作" width="120px">
          <template #default="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="MenuEdit(row.id)"
            />
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="MenuDelete(row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
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

<style lang="scss" scoped>
.app-container{
  padding: 20px;
  ::v-deep .el-card__body{
    padding: 20px;
  }
  ::v-deep .el-table th{
    background-color: #fafafa;
    border-bottom: 3px solid #e8e8e8;
}
}
.el-table{
  .el-icon-document{
     font-size: 16px;
     padding: 3px;
  }
::v-deep{
   .el-table__expand-icon{
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
     .el-table__expand-icon .el-icon-arrow-right:before{
        content: "\e78a";
        font-size: 16px;
    }
    .el-table__expand-icon--expanded .el-icon-arrow-right:before{
        content: "\e784";
        font-size: 16px;
    }
}
}
</style>
