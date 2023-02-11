<template>
  <el-card class="box-card">
    <PageTools>
      <template #left>
        <el-input v-model="input" size="small" placeholder="根据用户名搜索" />
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
            @click="edit(row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deletefn(row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-row
      type="flex"
      justify="end"
      align="center"
      style="height: 60px"
      class="rowspag"
    >
      <el-pagination
        :current-page="+page.page"
        :total="counts"
        :page-size="page.pagesize"
        :page-sizes="[10, 20, 30, 50]"
        layout="prev,pager,next,sizes,jumper"
        @current-change="changePage"
      />
    </el-row>
    <Update :show-dialog.sync="showDialog" />
  </el-card>
</template>

<script>
import { getUserListApi } from '@/api/background'
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
      pages: 2, // 总页数
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
      console.log(data)
      this.counts = data.counts
      this.list = data.list
      this.page.page = data.page
      this.pages = data.pages
      this.pagesize = data.pagesize
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
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  width: 1297px;
  padding: 20px;
}
.message {
  font-size: 13px !important;
}
.rowspag {
  margin-top: 20px !important;
}
</style>
