<template>
  <div>
    <div class="articles-container">
      <el-card class="box-card">
        <div class="el-col el-col-18">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="关键字">
              <!-- 文章搜索 -->
              <el-input
                v-model="formInline.keyword"
                placeholder="根据文章标题搜索"
              />
            </el-form-item>
            <!-- 状态 -->
            <el-form-item label="状态">
              <el-select v-model="formInline.state" placeholder="请选择">
                <el-option label="启用" :value="1" />
                <el-option label="禁用" :value="0" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="cls" @click="clear">
                清除
              </el-button>
              <el-button type="primary" @click="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <el-button type="primary" class="success" @click="Newskill">
            新增技巧
          </el-button>
        </div>
        <!-- 数据条 -->
        <el-alert title="数据一共20条" type="info" />
        <!-- 页面数据 -->
        <el-table :data="tableData" style="width: 100%" class="biaoge">
          <el-table-column
            prop="id"
            label="序号"
            type="index"
            :index="indexFn"
          />
          <el-table-column prop="title" label="文章标题" width="400" />
          <el-table-column prop="visits" label="阅读数" />
          <el-table-column prop="username" label="录入人" />
          <el-table-column prop="createTime" label="录入时间" width="172">
            <template v-slot="{ row }">
              {{ row.createTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.state == 1">已启用</span>
              <span v-if="scope.row.state == 0">已禁用</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180" prop="state">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="yulan(scope.row)">
                预览
              </el-button>
              <el-button type="text" size="small" @click="stopUsing(scope.row)">
                <span v-if="scope.row.state === 0">启用</span>
                <span v-else>禁用</span>
              </el-button>
              <el-button
                type="text"
                size="small"
                :disabled="scope.row.state === 0"
                @click="modify(scope.row.id)"
              >
                修改
              </el-button>
              <el-button
                type="text"
                size="small"
                :disabled="scope.row.state === 0"
                @click="deleteRow(scope.row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 底层栏 -->
        <Pagination
          :page-no="page"
          :page-size="pageSize"
          :total="total"
          @getPageNo="getPageNo"
        />
      </el-card>
    </div>
    <!-- 新增的弹层 -->
    <add-item ref="ADDITEMS" :show-dialog.sync="showDialog" />
    <!-- 预览的弹层 -->
    <article-item ref="Article" :article-dialog.sync="articleDialog" />
  </div>
</template>

<script>
import {
  ArticleListApi,
  ArticleStatusApi,
  ArticleDeleteApi
  // ArticleModificationApi,
} from '@/api/articles'
import AddItem from './components/add-item.vue'
import ArticleItem from './components/article-item.vue'

export default {
  components: {
    AddItem,
    ArticleItem
  },
  data() {
    return {
      formInline: {
        keyword: '', // 关键字
        state: '' // 开启关闭
      },
      searchVal: '', // 搜索栏
      tableData: [
        {
          id: '', // 序号
          title: '', // 文章标题
          visits: '', // 阅读数
          username: '', // 录入人
          createTime: '', // 录入时间
          state: '', // 状态
          videoURL: '', // 视频地址
          articleBody: '' // 文章正文
        }
      ],
      pageSize: 10, // 每页显示的数据条数
      page: 1, // 当前页数
      showDialog: false, // 新增弹层
      articleDialog: false, // 预览弹层
      total: 0,
      flag: false
    }
  },
  created() {
    this.biaodan()
  },
  methods: {
    // 页数
    getPageNo(page) {
      this.page = page
      if (this.flag) {
        this.biaodan(this.formInline)
      } else {
        this.biaodan()
      }
    },
    // 处理序号
    indexFn(index) {
      // 当前返回的序号   前面有多少条数据
      // 前面一共有多少条 = 前面的多少页 * 每页条数
      return index + 1 + (this.page - 1) * this.pageSize
    },
    // 数据渲染
    async biaodan(formInline) {
      const { items, counts } = await ArticleListApi({
        page: this.page,
        pageSize: this.pageSize,
        ...formInline
      })
      this.tableData = items
      this.total = counts
    },
    // 新增技巧 开启弹层
    Newskill() {
      this.showDialog = true
    },
    // 预览文章
    yulan(row) {
      this.$refs.Article.ArticleInfo = row
      this.articleDialog = true
    },
    // 状态 停用
    stopUsing(row) {
      // 对话框停用和启用状态转换
      let status = row.state
      if (row.state === 0) {
        status = '启用'
      } else {
        status = '停用'
      }
      this.$confirm('此操作将' + status + '该账户，是否继续？')
        // eslint-disable-next-line space-before-function-paren
        .then(async () => {
          if (row.state === 1) {
            // 确定操作 改变标识来改变状态
            row.state = 0
          } else {
            row.state = 1
          }
          const option = {
            // 准备接口需要的参数
            id: row.id,
            state: row.state
          }

          const res = await ArticleStatusApi(option) // 接口

          if (res.success) {
            this.$message.success(status + '成功！')
            this.biaodan() // 刷新列表
          } else {
            this.$message.error(status + '失败！')
            this.biaodan() // 刷新列表
          }
        })
    },
    // ArticleListApi(page = 1) {},
    // 修改编辑
    modify(id) {
      this.showDialog = true
      this.$refs.ADDITEMS.ArticleDetails(id)

      // const { data } = await ArticleModificationApi(id)
      // this.tableData = data
    },
    // 删除部门
    async deleteRow(id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // eslint-disable-next-line space-before-function-paren
        .then(async () => {
          await ArticleDeleteApi(id)
          if (this.tableData.length === 1 && this.page > 1) {
            this.page--
          }
          this.biaodan()
          this.$message.success('删除员工成功！')
        })
        .catch(() => {
          // 点击取消触发的方法
        })
      this.biaodan()
    },
    // 搜索
    search() {
      this.flag = true
      this.biaodan(this.formInline)
    },
    // 清除
    clear() {
      this.formInline = {}
      this.flag = false
    }
  }
  // 搜索框
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100% !important;
  .el-col-18 {
    width: 75%;
  }
}
.articles-container {
  padding: 10px;
  border-radius: 4px;
  padding: 20px;
}
.cls {
  background-color: #fff;
  color: #606266;
}
.right {
  width: 25%;
  float: left;
  text-align: right;
  .success {
    background-color: #67c23a;
  }
}
.block {
  text-align: right;
  margin-top: 20px;
}
.biaoge {
  white-space: nowrap;
}
</style>
