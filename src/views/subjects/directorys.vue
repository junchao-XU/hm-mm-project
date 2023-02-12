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
            @click="showDialog = true"
          >
            新增目录
          </el-button>
        </el-col>
      </el-row>

      <!-- <PageTools>
        <template #left>
          <el-input
            v-model="directoryName"
            class="left"
            size="small"
            placeholder="学科名称"
          />
          <el-select v-model="value" placeholder="请选择">
            <el-option label="启用" :value="state">启用</el-option>
            <el-option label="禁用" :value="state">禁用</el-option>
          </el-select>
          <el-button style="margin-left: 10px" size="mini" @click="clear">
            清空
          </el-button>
          <el-button size="mini" type="primary" @click="search">
            搜索
          </el-button>
        </template>
        <template #right>
          <el-button
            size="small"
            type="success"
            icon="el-icon-edit"
            @click="showDialog = true"
          >
            新增学科
          </el-button>
        </template>
      </PageTools> -->
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
        <!-- <el-table-column prop="tags" label="标签" />
        <el-table-column prop="totals" label="题目数量" /> -->
        <el-table-column label="操作" width="240">
          <template #default="{ row }">
            <el-button type="text" @click="classifyfn(row.id)">
              学科分类
            </el-button>
            <el-button type="text" @click="labelfn(row.id)">学科标签</el-button>
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
      <SubjectUpdate
        ref="SubjectUpdate"
        :show-dialog.sync="showDialog"
        @updateList="getSubjectList"
      />
    </el-card>
  </div>
</template>

<script>
import { getDirectorysListApi, delSubjectApi } from '@/api/directorys'

import SubjectUpdate from './component/subjectUpdate'

export default {
  components: { SubjectUpdate },
  data() {
    return {
      flag: false,
      directoryName: '', // 目录名称
      state: 0, // 状态
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
        this.getSubjectList(this.directoryName)
      } else {
        this.getSubjectList()
      }
      this.page.page = Page
    },
    // 获取目录列表
    async getDirectorysList(subjectName) {
      const data = await getDirectorysListApi({ ...this.page, subjectName })
      this.list = data.items
      this.counts = data.counts
    },
    // 学科分类
    classifyfn() {},
    // 学科标签
    labelfn() {},
    //  编辑
    editfn(id) {
      this.$refs.SubjectUpdate.getsubjectDetail(id)
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
          await delSubjectApi(id)
          this.getDirectorysList()
          this.$message.success('删除用户成功')
        })
    },
    // 搜索
    search() {
      this.flag = true
      this.getSubjectList(this.subjectName)
    },
    // 清除
    clear() {
      this.flag = false
      this.getSubjectList()
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
