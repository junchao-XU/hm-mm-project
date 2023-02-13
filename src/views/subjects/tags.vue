<template>
  <div class="app-container">
    <el-card v-loading="loading" class="box-card">

      <!-- 顶部表单 -->
      <el-row type="flex" style="margin-bottom: 10px">
        <el-col>
          <span class="text">标签名称</span>
          <el-input
            v-model="distObj.tagName"
            style="width: 190px"
            class="left"
            size="small"
          />
          <span class="text">状态</span>
          <el-select
            v-model="distObj.state"
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
            新增标签
          </el-button>
        </el-col>
      </el-row>

      <!-- 提示信息 -->
      <Message>
        <template #message>
          <span class="message">共{{ counts }}条记录</span>
        </template>
      </Message>

      <!-- 表格 -->
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="subjectName" label="所属学科" />
        <el-table-column prop="tagName" label="目录名称" />
        <el-table-column prop="username" label="创建者" />
        <el-table-column prop="addDate" label="创建日期">
          <template v-slot="{row}">
            {{ row.addDate | parseTime }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template v-slot="{row}">
            {{ row.state === 1 ?'已启用':'已禁用' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template #default="{ row }">
            <el-button v-if="row.state === 1" type="text" @click="Banfn(row.id,0)">禁用</el-button>
            <el-button v-else type="text" @click="Banfn(row.id,1)">启用</el-button>
            <el-button :disabled="row.state === 1" type="text" @click="editfn(row.id)">修改</el-button>
            <el-button type="text" @click="deletefn(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <Pagination
        style="margin-top: 20px;"
        :page-no="page.page"
        :page-size="page.pagesize"
        :total="counts"
        @getPageNo="getPageNo"
      />

      <!-- 弹窗 -->
      <EditTage
        ref="EditTage"
        :show-dialog.sync="showDialog"
        @updateList="gettagsList"
      />
    </el-card>
  </div>
</template>

<script>
import { gettagsListApi, delTagsListApi, editTagsStateApi } from '@/api/tags'
import EditTage from './component/edittags'
export default {
  components: { EditTage },
  data() {
    return {
      loading: false,
      flag: false,
      subjectID: this.$route.query.id,
      distObj: {
        // tagName: '', // 标签名称
        // state: '' // 状态
      },
      counts: 2, // 总记录数
      page: {
        page: 1, // 当前页数
        pagesize: 10
      },
      list: [],

      showDialog: false // 新增弹层
    }
  },
  watch: {
    '$route': {
      deep: true,
      handler() {
        console.log(this.subjectID)
        this.gettagsList()
      }
    }
  },
  created() {
    this.gettagsList()
  },
  methods: {
    // 获取当前页
    getPageNo(Page) {
      if (this.flag) {
        this.gettagsList(this.tagName)
      } else {
        this.gettagsList()
      }
      this.page.page = Page
    },
    // 新增目录
    updatedirectory() {
      this.showDialog = true
      this.$refs.EditTage.getDirectorSimple()
    },
    // 获取目录列表
    async gettagsList() {
      this.loading = true
      let data = {}
      if (this.$route.query.id !== undefined) {
        data = await gettagsListApi({ ...this.page, ...this.distObj, subjectID: this.subjectID })
      } else {
        data = await gettagsListApi({ ...this.page, ...this.distObj })
      }
      this.list = data.items
      this.counts = data.counts
      this.loading = false
    },
    // 禁用
    async Banfn(id, state) {
      await editTagsStateApi(id, state)
      this.gettagsList()
    },
    //  编辑
    editfn(id) {
      this.$refs.EditTage.gettagsDetali(id)
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
          await delTagsListApi(id)
          this.gettagsList(this.distObj)
          this.$message.success('删除用户成功')
        })
    },
    // 搜索
    search() {
      this.flag = true
      this.gettagsList()
    },
    // 清除
    clear() {
      this.flag = false
      this.distObj = {}
      this.gettagsList()
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
