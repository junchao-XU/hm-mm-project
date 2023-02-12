<template>
  <div class="app-container">
    <el-card class="box-card">
      <!-- 表单 -->
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label-width="80px" label="关键字">
              <el-input v-model="keyword" style="width: 282px;" placeholder="根据编号搜索" />
            </el-form-item>
          </el-col>
          <el-col style="float: right;" :span="12">
            <el-form-item style="float: right;">
              <el-button size="mini" @click="clear">清除</el-button>
              <el-button size="mini" type="primary" @click="search">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 中间提示信息 -->
      <el-alert
        :title="`共${total}条数据`"
        type="info"
        :closable="false"
        show-icon
        style="margin-bottom: 20px;"
      />

      <!-- 表格 -->
      <el-table :data="TitleList" style="width: 100%">、
        <el-table-column
          prop="id"
          label="编号"
          align="left"
          width="220"
        />
        <el-table-column
          prop="questionType"
          label="题型"
          align="left"
          width="80"
        >
          <template v-slot="{row}">
            {{ questionType(row) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="questionIDs"
          label="题目编号"
          align="left"
          width="220"
        >
          <template v-slot="{row}">
            <div v-for="(item,index) in row.questionIDs" :key="index" style="color: #0099ff;">
              {{ item.number }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="addTime"
          label="录入时间"
          align="left"
          width="180"
        />
        <el-table-column
          prop="totalSeconds"
          label="答题时间(s)"
          align="left"
        />
        <el-table-column
          prop="accuracyRate"
          label="正确率(%)"
          align="left"
        />
        <el-table-column
          prop="userName"
          label="录入人"
          align="left"
        />
        <el-table-column
          prop="number"
          label="操作"
          align="left"
          width="80"
        >
          <template v-slot="{row}">
            <el-button size="small" plain type="danger" icon="el-icon-delete" circle @click="remove(row)" />
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <Pagination style="margin-top: 20px;" :page-no="page.page" :page-size="page.pageSize" :total="total" @getPageNo="getPageNo" />
    </el-card>
  </div>
</template>

<script>
import QUESTIONS from '@/api/constant/questions.js'
import { getTitleListApi, deleteTileApi } from '@/api/questions'
export default {
  data() {
    return {
      total: 0, // 总条数
      keyword: '', // 关键字
      page: {
        page: 1,
        pagesize: 10
      },
      TitleList: [],
      flag: false
    }
  },
  created() {
    this.getTitleList()
  },
  methods: {
    // 获取组题列表
    async getTitleList(keyword) {
      const { counts, items } = await getTitleListApi({ ...this.page, keyword })
      this.total = counts
      this.TitleList = items
    },
    // 遍历题型
    questionType(row) {
      return QUESTIONS.questionType.find(i => i.id === row.questionType)?.value
    },
    // 获取当前页
    getPageNo(page) {
      this.page.page = page
      if (this.flag) {
        this.getTitleList(this.keyword)
      } else {
        this.getTitleList()
      }
    },
    // 搜索
    search() {
      if (this.keyword.trim() === '') return
      this.flag = true
      this.getTitleList(this.keyword)
    },
    // 清除
    clear() {
      this.flag = false
      this.keyword = ''
    },
    // 删除
    remove(row) {
      this.$confirm('确认删除次题目吗?').then(async() => {
        await deleteTileApi(row)
        this.$message.success('删除成功')
        this.getTitleList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  padding: 20px;
  ::v-deep .el-table th{
    background-color: #fafafa;
    border-bottom: 3px solid #e8e8e8;
}
::v-deep .el-input__inner {
  height: 32px;
    line-height: 32px;
}
.el-col-6 {
  height: 50px;
}
}
</style>
