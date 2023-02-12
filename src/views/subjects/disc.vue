<template>
  <div class="app-container">
    <el-card class="box-card">
      <PageTools>
        <template #left>
          <el-input
            v-model="subjectName"
            class="left"
            size="small"
            placeholder="学科名称"
          />
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
      </PageTools>
      <Message>
        <template #message>
          <span class="message">共{{ counts }}条记录</span>
        </template>
      </Message>
      <!-- 表格 -->
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="subjectName" label="学科名称" />
        <el-table-column prop="username" label="创建者" />
        <el-table-column prop="addDate" label="创建日期" />
        <el-table-column prop="isFrontDisplay" label="前台是否显示" />
        <el-table-column prop="twoLevelDirectory" label="二级目录" />
        <el-table-column prop="tags" label="标签" />
        <el-table-column prop="totals" label="题目数量" />
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
import { getSubjectListApi } from '@/api/subject'
import SubjectUpdate from './component/subjectUpdate'

export default {
  components: { SubjectUpdate },
  data() {
    return {
      flag: false,
      subjectName: '',
      counts: 2, // 总记录数
      page: {
        page: 1, // 当前页数
        pagesize: 10
      },
      list: [],
      // formdata: {
      //   addDate: '', // 创建日期
      //   creatorID: '',
      //   id: '', // 编号
      //   isFrontDisplay: '', // 前台是否显示
      //   subjectName: '', // 学科名称
      //   tags: '', //	标签
      //   totals: '', //	题目数量
      //   twoLevelDirectory: '', //	二级目录
      //   username: '' // 用户名
      // },
      showDialog: false // 新增弹层
    }
  },
  created() {
    this.getSubjectList()
  },
  methods: {
    getPageNo(Page) {
      if (this.flag) {
        this.getSubjectList(this.subjectName)
      } else {
        this.getSubjectList()
      }
      this.page.page = Page
    },
    // 获取学科列表
    async getSubjectList(subjectName) {
      const data = await getSubjectListApi({ ...this.page, subjectName })
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
    deletefn() {},
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
</style>
