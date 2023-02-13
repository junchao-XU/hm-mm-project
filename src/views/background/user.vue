<template>
  <div class="app-container">
    <el-card class="box-card">
      <PageTools>
        <template #left>
          <el-input
            v-model="input"
            class="left"
            size="small"
            placeholder="根据用户名搜索"
          />
          <el-button size="mini"> 清空 </el-button>
          <el-button size="mini" type="primary"> 搜索 </el-button>
        </template>
        <template #right>
          <el-button
            size="small"
            type="success"
            icon="el-icon-edit"
            @click="showDialog = true"
          >
            新增用户
          </el-button>
        </template>
      </PageTools>
      <Message>
        <template #message>
          <span class="message">共{{ counts }}条记录</span>
        </template>
      </Message>
      <!-- 表格 -->
      <el-table v-loading="loading" :data="list" style="width: 100%">
        <el-table-column
          label="序号"
          width="180"
          :index="indexMethod"
          type="index"
        />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="phone" label="联系电话" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="permission_group_title" label="权限组名称" />
        <el-table-column prop="role" label="角色" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="edit(row.id)"
            />
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="deletefn(row.id)"
            />
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <Pagination style="margin-top: 20px;" :total="counts" :page-size="page.pagesize" :page-no="page.page" @getPageNo="changePage" />

      <!-- 弹窗 -->
      <Update
        ref="updataDialog"
        :show-dialog.sync="showDialog"
        @update="getUserList()"
      />

    </el-card>
  </div>
</template>

<script>
import { getUserListApi, deleteUserApi } from '@/api/background'
import Update from './component/update'
export default {
  components: {
    Update
  },
  data() {
    return {
      page: {
        page: 1,
        pagesize: 10 // 每页条数
        // keyword: ''
      },
      counts: 1, // 总数
      list: [],
      input: '',
      showDialog: false, // 新增弹层
      loading: true // 加载状态
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 用户列表
    async getUserList() {
      const data = await getUserListApi(this.page)
      this.counts = data.counts
      this.list = data.list
      this.loading = false
    },
    // 页码
    indexMethod(index) {
      return (this.page.page - 1) * this.page.pagesize + index + 1
    },
    // 页码改变
    changePage(newpage) {
      this.page.page = newpage
      this.getUserList() // 重新获取数据
    },

    // 点击编辑数据回显
    edit(id) {
      this.$refs.updataDialog.getUserInfoDetail(id)
      this.showDialog = true
    },
    // 删除
    deletefn(id) {
      this.$confirm('确认删除员工吗', {
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        // eslint-disable-next-line space-before-function-paren
        .then(async () => {
          await deleteUserApi(id)
          if (this.list.length === 1 && this.page.page > 1) {
            this.page.page--
          }
          this.getUserList()
          this.$message.success('删除用户成功')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  // width: 1297px;
  padding: 20px;
}
.message {
  font-size: 13px !important;
}
.rowspag {
  margin-top: 20px !important;
}
.left {
  margin-right: 15px;
}
.app-container {
  padding: 20px;
  ::v-deep .el-card__body {
    padding: 20px;
  }
  ::v-deep .el-table th {
    background-color: #fafafa;
    border-bottom: 3px solid #e8e8e8;
  }
}
</style>
