<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row type="flex" style="margin-bottom: 10px">
        <el-col>
          <span class="text">目录名称</span>
          <el-input
            v-model="directoryName"
            style="width: 190px"
            class="left"
            size="small"
          />
          <span class="text">状态</span>
          <el-select
            v-model="state"
            placeholder="请选择"
            size="small"
            style="margin-left: 10px"
          >
            <el-option label="启用" :value="1">启用</el-option>
            <el-option label="禁用" :value="0">禁用</el-option>
          </el-select>
          <el-button style="margin-left: 10px" size="mini" @click="clear">
            清空
          </el-button>
          <el-button size="mini" type="primary" @click="search">
            搜索
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button
            size="small"
            type="success"
            icon="el-icon-edit"
            @click="updatedirectory"
          >
            新增目录
          </el-button>
        </el-col>
      </el-row>

      <Message>
        <template #message>
          <span class="message">共{{ counts }}条记录</span>
        </template>
      </Message>
      <!-- 表格 -->
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="subjectName" label="所属学科" />
        <el-table-column prop="directoryName" label="目录名称" />
        <el-table-column prop="username" label="创建者" />
        <el-table-column prop="addDate" label="创建日期" />
        <el-table-column prop="totals" label="面试题数量" />
        <el-table-column prop="state" label="状态" />
        <el-table-column label="操作" width="240">
          <template #default="{ row }">
            <el-button type="text" @click="Banfn(row.id)">禁用</el-button>
            <el-button type="text" @click="editfn(row.id)">修改</el-button>
            <el-button type="text" @click="deletefn(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <Pagination
        :page-no="page.page"
        :page-size="page.pagesize"
        :total="counts"
        @getPageNo="getPageNo"
      />
      <Editdirectorys
        ref="Editdirectorys"
        :show-dialog.sync="showDialog"
        @updateList="getDirectorysList"
      />
    </el-card>
  </div>
</template>

<script>
import { getDirectorysListApi, deldirectorsjectApi } from '@/api/directorys'

import Editdirectorys from './component/editdirectorys'

export default {
  components: { Editdirectorys },
  data() {
    return {
      flag: false,
      directoryName: '', // 目录名称
      state: 1, // 状态
      counts: 2, // 总记录数
      page: {
        page: 1, // 当前页数
        pagesize: 10
      },
      list: [],

      showDialog: false // 新增弹层
    }
  },
  created() {
    this.getDirectorysList()
  },
  methods: {
    getPageNo(Page) {
      if (this.flag) {
        this.getDirectorysList(this.directoryName)
      } else {
        this.getDirectorysList()
      }
      this.page.page = Page
    },
    // 新增目录
    updatedirectory() {
      this.showDialog = true
      this.$refs.Editdirectorys.getDirectorSimple()
    },
    // 获取目录列表
    async getDirectorysList(directoryName, state) {
      const data = await getDirectorysListApi({
        ...this.page,
        directoryName,
        state
      })
      this.list = data.items
      this.counts = data.counts
    },

    // 禁用
    Banfn() {
      this.state = 0
    },
    //  编辑
    editfn(id) {
      this.$refs.Editdirectorys.getDirectorsDetail(id)
      this.showDialog = true
    },
    // 删除
    async deletefn(id) {
      this.$confirm('确认删除员工吗', {
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        // eslint-disable-next-line space-before-function-paren
        .then(async () => {
          await deldirectorsjectApi(id)
          this.getDirectorysList()
          this.$message.success('删除用户成功')
        })
    },
    // 搜索
    search() {
      this.flag = true
      this.getDirectorysList(this.directoryName)
    },
    // 清除
    clear() {
      this.flag = false
      this.getDirectorysList()
    }
  }
}
</script>

<style lang="scss" scoped>
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
.text {
  font-weight: 700;
  font-size: 14px;
  margin-right: 10px;
  margin-left: 10px;
}
</style>
