<template>
  <div class="app-container">
    <el-card v-loading="Loading" class="box-card">

      <!-- 顶部 -->
      <el-row type="flex" style="margin-bottom: 10px;" justify="space-between">
        <div style="color: pink;font-size: 12px;">说明：目前支持学科和关键字条件筛选</div>
        <el-button size="small" type="success" icon="el-icon-edit" @click="$router.push('/questions/new')">新增试题</el-button>
      </el-row>

      <!-- 表单 -->
      <el-form :model="formData">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label-width="80px" label="学科">
              <el-select v-model="formData.subjectID" style="width: 100%;" placeholder="请选择">
                <el-option v-for="(item,index) in DisciplineList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="二级目录">
              <el-select v-model="formData.catalogID" style="width: 100%;" placeholder="请选择">
                <el-option v-for="item in DirList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="标签">
              <el-select v-model="formData.tags" style="width: 100%;" placeholder="请选择">
                <el-option v-for="item in TagsList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="关键字">
              <el-input v-model="formData.keyword" style="width: 100%;" placeholder="根据题干搜索" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="试题类型">
              <el-select v-model="formData.questionType" style="width: 100%;" placeholder="请选择">
                <el-option v-for="item in QUESTIONS.questionType" :key="item.id" :label="item.value" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="难度">
              <el-select v-model="formData.difficulty" style="width: 100%;" placeholder="请选择">
                <el-option v-for="item in QUESTIONS.difficultyType" :key="item.id" :label="item.value" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="方向">
              <el-select v-model="formData.direction" style="width: 100%;" placeholder="请选择">
                <el-option v-for="item in QUESTIONS.directionType" :key="item.id" :label="item.value" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="录入人">
              <el-select v-model="formData.creatorIDL" style="width: 100%;" placeholder="请选择">
                <el-option v-for="item in UsersList" :key="item.id" :label="item.email" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="题目备注">
              <el-input v-model="formData.remarks" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="企业简称">
              <el-input v-model="formData.shortName" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市地区" label-width="80px">
              <el-col style="padding-left: 0;" :span="12">
                <el-select v-model="formData.province" placeholder="请选择">
                  <el-option
                    v-for="item in ProvinceList"
                    :key="item"
                    :label="item"
                    :value="item
                    "
                  />
                </el-select>
              </el-col>
              <el-col style="padding-right: 0;" :span="12">
                <el-select v-model="formData.city" placeholder="请选择">
                  <el-option
                    v-for="item in CityList"
                    :key="item"
                    :label="item"
                    :value="item
                    "
                  />
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-row type="flex" justify="end" align="center">
              <el-button style="height: 32px;" size="mini" @click="clear">清除</el-button>
              <el-button style="height: 32px;" size="mini" type="primary" @click="search">搜索</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-form>

      <el-tabs v-model="chkState" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="3" />
        <el-tab-pane label="待审核" name="0" />
        <el-tab-pane label="已审核" name="1" />
        <el-tab-pane label="已拒绝" name="2" />
      </el-tabs>

      <!-- 中间提示信息 -->
      <el-alert
        :title="`共${counts}条数据`"
        type="info"
        :closable="false"
        show-icon
        style="margin-bottom: 20px;"
      />

      <!-- 表格 -->
      <el-table :data="SelectList" style="width: 100%">
        <el-table-column
          width="120"
          prop="number"
          label="试题编号"
          align="left"
        />
        <el-table-column
          width="120"
          prop="subject"
          label="学科"
          align="left"
        />
        <el-table-column
          width="120"
          prop="catalog"
          label="目录"
          align="left"
        />
        <el-table-column
          width="120"
          prop="questionType"
          label="题型"
          align="left"
        >
          <template v-slot="{row}">
            {{ questionType(row) }}
          </template>
        </el-table-column>
        <el-table-column
          width="280"
          prop="question"
          label="题干"
          align="left"
        >
          <template v-slot="{row}">
            <span v-html="row.question" />
          </template>
        </el-table-column>
        <el-table-column
          prop="addDate"
          label="录入时间"
          align="left"
          width="180px"
        >
          <template v-slot="{row}">
            {{ row.addDate | parseTime }}
          </template>
        </el-table-column>
        <el-table-column
          prop="difficulty"
          label="难度"
          align="left"
        >
          <template v-slot="{row}">
            {{ Deff(row) }}
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          prop="creator"
          label="录入人"
          align="left"
        />
        <el-table-column
          width="120"
          prop="chkState"
          label="审核状态"
          align="left"
        >
          <template v-slot="{row}">
            {{ chkStateFn(row) }}
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          prop="chkRemarks"
          label="审核意见"
          align="left"
        />
        <el-table-column
          width="120"
          prop="chkUser"
          label="审核人"
          align="left"
        />
        <el-table-column
          width="150"
          prop="publishState"
          label="发布状态"
          align="left"
        >
          <template v-slot="{row}">
            {{ releaseFn(row) }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="200px"
          label="操作"
          align="left"
        >
          <template v-slot="{row}">
            <el-button size="small" type="text" @click="preview(row)">预览</el-button>
            <el-button :disabled="row.chkState !== 0" size="small" type="text" @click="audit(row)">审核</el-button>
            <el-button :disabled="row.publishState === 0" size="small" type="text" @click="edit(row)">修改</el-button>
            <el-button v-if="row.publishState === 1" size="small" type="text" @click="UpDown(row,0)">上架</el-button>
            <el-button v-else size="small" type="text" @click="UpDown(row,1)">下架</el-button>
            <el-button size="small" type="text" @click="remove(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <Pagination style="margin-top: 20px;" :page-no="this.page.page" :page-size="this.page.pageSize" :total="counts" @getPageNo="getPageNo" />
    </el-card>
    <!-- 预览 -->
    <preview-item ref="PREVIEW" :show-dialog.sync="PreShowDialog" />
    <!-- 审核 -->
    <audit-item ref="AUDIT" :show-dialog.sync="AudShowDialog" @getSelectList="getSelectList" />
  </div>
</template>

<script>
import AuditItem from './components/audit-item.vue'
import PreviewItem from './components/preview-item.vue'
import { getProvinceApi } from '@/api/enterprise'
import { deleteBasicsApi, UpDownApi, getPreviewInfoApi, getDisciplineApi, getUsersListApi, getDirectorysApi, getTagsListApi, getSelectListApi } from '@/api/questions'
import QUESTIONS from '@/api/constant/questions.js'
import Axios from 'axios'
export default {
  components: { PreviewItem, AuditItem },
  data() {
    return {
      flag: false,
      Loading: false,
      AudShowDialog: false, // 审核弹窗
      PreShowDialog: false, // 预览弹窗
      chkState: '3',
      QUESTIONS,
      page: {
        page: 1,
        pagesize: 10
      },
      formData: {
        subjectID: '', // 学科
        catalogID: '', // 二级目录
        tags: '', // 标签
        keyword: '', // 关键字
        questionType: '', // 试题类型
        difficulty: '', // 难度
        direction: '', // 方向
        creatorIDL: '', // 录入人
        remarks: '', // 题目备注
        shortName: '', // 企业简称
        province: '', // 所在省份
        city: '' // 所在城市
      },

      counts: 0, // 总条数
      SelectList: [], // 精选试题数据
      DisciplineList: [], // 学科列表
      UsersList: [], // 录入人列表
      DirList: [], // 二级目录列表
      TagsList: [], // 标签列表
      ProvinceList: [], // 省份列表
      CityList: [] // 城市列表

    }
  },
  watch: {
    'formData.subjectID': {
      async handler(newVal) {
        this.DirList = await getDirectorysApi(newVal) // 获取学科列表
        this.TagsList = await getTagsListApi(newVal) // 获取标签列表
      }
    },
    'formData.province': {
      async handler(newVal) {
        this.getCityList(newVal)
      }
    }
  },
  created() {
    this.getDiscipline()
    this.getUsersList()
    this.getProvinceList()
    this.getSelectList()
  },
  methods: {
    // 获取城市列表
    async getCityList(province) {
      Axios.get(`http://ajax-api.itheima.net/api/city?pname=${province}`).then(({ data }) => {
        this.CityList = data.data
        this.formData.city = data.data[0]
      })
    },
    // 获取省份列表
    async getProvinceList() {
      const { data } = await getProvinceApi()
      this.ProvinceList = data.data
    },
    // 获取录入人列表
    async getUsersList() {
      const res = await getUsersListApi()
      this.UsersList = res
    },
    // 获取学科列表
    async getDiscipline() {
      const res = await getDisciplineApi()
      this.DisciplineList = res
    },
    // 获取精选题库列表
    async getSelectList() {
      let data = {}
      this.Loading = true
      if (this.flag) {
        data = await getSelectListApi({ ...this.page, ...this.formData })
      } else {
        data = await getSelectListApi({ ...this.page })
      }

      this.counts = data.counts
      this.SelectList = data.items
      this.Loading = false
    },
    /**
     * @表格筛选
     */
    // 遍历难易程度
    Deff(row) {
      return QUESTIONS.difficultyType.find(i => i.id === row.difficulty) ? QUESTIONS.difficultyType.find(i => i.id === row.difficulty).value : '未知'
    },
    // 遍历题型
    questionType(row) {
      return QUESTIONS.questionType.find(i => i.id === row.questionType)?.value
    },
    // 审核状态
    chkStateFn(row) {
      const obj = QUESTIONS.chkStateType.find(i => Number(i.id) === row.chkState)
      return obj ? obj.value : ''
    },
    // 发布状态
    releaseFn(row) {
      const obj = QUESTIONS.releaseType.find(i => Number(i.id) === row.publishState)
      return obj ? obj.value : '待发布'
    },
    // 根据当前页获取数据
    getPageNo(page) {
      this.page.page = page
      this.getCityList()
    },
    // 切换tab栏获取不同的数据
    handleClick() {
      if (this.chkState === '3') this.getSelectList()
      else this.getSelectList({ chkState: this.chkState })
    },
    /**
     * @操作
     */
    // 预览
    async preview(row) {
      const res = await getPreviewInfoApi(row.id)
      this.$refs.PREVIEW.formDate = res
      this.showDialog = true
    },
    // 搜索
    search() {
      if (Object.values(this.formData).join('') !== '') {
        this.flag = true
        this.getSelectList(this.formData)
      }
    },
    // 清除
    clear() {
      this.flag = false
      this.formData = {}
      this.getSelectList()
    },
    // 审核
    audit(row) {
      this.AudShowDialog = true
      this.$refs.AUDIT.formDate.id = row.id
    },
    // 上架下架
    UpDown(row, publishState) {
      const text = publishState === 0 ? '上架' : '下架'
      this.$confirm(`确认${text}这道题目吗?`).then(async() => {
        await UpDownApi(row.id, publishState)
        this.$message.success('操作成功')
        this.getSelectList()
      })
    },
    // 编辑修改
    edit(row) {
      this.$router.push({
        path: '/questions/new',
        query: {
          id: row.id
        }
      })
    },
    // 删除
    remove(row) {
      this.$confirm('确认删除这道题目吗?').then(async() => {
        await deleteBasicsApi(row.id)
        this.$message.success('删除成功')
        this.getSelectList()
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
