<template>
  <div>
    <div class="articles-container">
      <el-card class="box-card">
        <div class="el-col el-col-18">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="关键字">
              <!-- 文章搜索 -->
              <el-input
                v-model="formInline.user"
                placeholder="根据文章搜索标题"
              />
            </el-form-item>
            <!-- 状态 -->
            <el-form-item label="状态">
              <el-select v-model="formInline.region" placeholder="请选择">
                <el-option label="启用" value="启用" />
                <el-option label="禁用" value="禁用" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="cls"> 清除 </el-button>
              <el-button type="primary">搜索</el-button>
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
            fixed
            prop="id"
            label="序号"
            width="80
            "
            type="index"
          />
          <el-table-column prop="title" label="文章标题" width="400" />
          <el-table-column prop="visits" label="阅读数" />
          <el-table-column prop="username" label="录入人" />
          <el-table-column prop="createTime" label="录入时间" width="172" />
          <el-table-column prop="state" label="状态" />
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small">预览</el-button>
              <el-button type="text" size="small">禁用</el-button>
              <el-button type="text" size="small">修改</el-button>
              <el-button
                type="text"
                size="small"
                @click.native.prevent="deleteRow(scope.$index, tableData)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 底层栏 -->
        <div class="block">
          <el-pagination
            layout="  prev, pager, next,sizes, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { ArticleListApi } from '@/api/articles'
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },

      tableData: [
        {
          id: '', // 序号
          title: '', // 文章标题
          visits: '', // 阅读数
          username: '', // 录入人
          createTime: '', // 录入时间
          state: false // 状态
        }
      ]
    }
  },
  created() {
    this.biaodan()
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 数据渲染
    async biaodan() {
      const { items } = await ArticleListApi()
      this.tableData = items
    }
  }
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
