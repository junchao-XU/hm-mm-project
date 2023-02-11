<template>
  <div class="app-container">
    <el-card class="box-card">

      <!-- 表单 -->
      <el-form ref="Form" :model="enterpriseData">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item prop="tags" label-width="80px" label="标签名称">
              <el-input v-model="enterpriseData.tags" style="width: 100%;" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="省份">
              <el-select v-model="enterpriseData.province" style="width: 100%;" placeholder="请选择">
                <el-option
                  v-for="(item,index) in provinceList"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="city" style="height: 34px;" label-width="80px" label="城市">
              <el-select v-model="enterpriseData.city" style="width: 100%;" placeholder="请选择">
                <el-option
                  v-for="(item,index) in cityList"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="shortName" label-width="80px" label="企业简称">
              <el-input v-model="enterpriseData.shortName" style="width: 100%;" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="state" label-width="80px" label="状态">
              <el-select v-model="enterpriseData.state" style="width: 100%;" placeholder="请选择">
                <el-option label="启用" :value="1" />
                <el-option label="禁用" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <div style="padding-left: 40px;">
              <el-button size="medium" @click="enterpriseData = {}">清除</el-button>
              <el-button size="medium" type="primary" @click="getCompanysList(enterpriseData)">搜索</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="float: right;">
              <el-button icon="el-icon-edit" size="medium" type="success" @click="add">新增用户</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <!-- 消息提示 -->
      <el-alert
        :title="`共${counts}条数据`"
        type="info"
        :closable="false"
        show-icon
        style="margin-bottom: 20px;"
      />

      <!-- 表格 -->
      <el-table :data="CompanysList" style="width: 100%">
        <el-table-column
          prop="id"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="number"
          label="企业编号"
          align="center"
        />
        <el-table-column
          prop="shortName"
          label="企业简称"
          align="center"
        />
        <el-table-column
          prop="tags"
          label="标签"
          align="center"
        />
        <el-table-column
          prop="creatorID"
          label="创建者"
          align="center"
        /><el-table-column
          prop="addDate"
          label="创建日期"
          align="center"
        >
          <template v-slot="{row}">
            {{ row.addDate | parseTime('{y}-{m}-{d}') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注"
          align="center"
        />
        <el-table-column
          prop="state"
          label="状态"
          align="center"
        >
          <template v-slot="{row}">
            {{ row.state === 1 ? '启用':'禁用' }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template v-slot="{row}">
            <el-button size="small" plain type="primary" icon="el-icon-edit" circle @click="edit(row)" />
            <el-tooltip class="item" effect="dark" :content="row.state !== 1 ? '启用':'禁用'" placement="top">
              <el-button v-if="row.state !== 1" size="small" plain type="success" icon="el-icon-check" circle @click="set(row,1)" />
              <el-button v-else size="small" plain type="warning" icon="el-icon-close" circle @click="set(row,2)" />
            </el-tooltip>
            <el-button size="small" plain type="danger" icon="el-icon-delete" circle @click="remove(row)" />
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <Pagination style="margin-top: 20px;" :page-no="page.page" :page-size="page.pagesize" :total="counts" @getPageNo="getPageNo" />

    </el-card>

    <!-- 添加 | 编辑 -->
    <AddItem ref="Item" :city-list="cityList" :province-list="provinceList" :show-dialog.sync="showDialog" @getCompanysList="getCompanysList" @getcityList="getcityList($event)" />
  </div>
</template>

<script>
import AddItem from './components/add-item.vue'
import { getCompanysListApi, getProvinceApi, getCompanysInfoApi, deleteCompanysApi, CompanysStateApi } from '@/api/enterprise'
import Axios from 'axios'

export default {
  components: { AddItem },
  data() {
    return {
      showDialog: false, // 弹窗
      provinceList: [], // 省份列表
      cityList: [], // 城市列表
      CompanysList: [], // 企业管理列表
      counts: 0, // 总条数
      enterpriseData: {
        tags: '', // 标签名称
        province: '', // 企业所在地省份
        city: '', // 企业所在城市
        shortName: '', // 企业简称
        state: '' // 状态
      },
      page: {
        page: 1,
        pagesize: 10
      }
    }
  },
  watch: {
    'enterpriseData.province': {
      handler(newVal) {
        this.getcityList(newVal)
      }
    }
  },
  created() {
    this.getProvinceList()
    this.getCompanysList()
  },
  methods: {
    // 获取省份列表
    async getProvinceList() {
      const { data } = await getProvinceApi()
      this.provinceList = data.data
    },
    // 获取城市列表
    getcityList(province) {
      Axios.get(`http://ajax-api.itheima.net/api/city?pname=${province}`).then(({ data }) => {
        this.cityList = data.data
        this.enterpriseData.city = data.data[0]
      })
    },
    // 获取企业管理列表
    async getCompanysList(enterpriseData) {
      const { counts, items } = await getCompanysListApi({ ...this.page, ...enterpriseData })
      // counts items
      this.CompanysList = items
      this.counts = counts
    },
    // 获得当前的页数
    getPageNo(page) {
      this.page.page = page
      this.getCompanysList()
    },
    // 添加
    add() {
      this.showDialog = true
    },
    // 编辑
    async edit(row) {
      const res = await getCompanysInfoApi(row.id)
      this.$refs.Item.formDate = res
      this.showDialog = true
    },
    // 删除
    remove(row) {
      this.$confirm('确认删除吗').then(() => {
        deleteCompanysApi(row.id).then(() => {
          this.$message.success('删除成功')
          this.getCompanysList()
        })
      })
    },
    // 设置状态
    set(row, state) {
      this.$confirm(this.stateSet(state)).then(async() => {
        await CompanysStateApi(row.id, state)
        this.$message.success(state === 1 ? '启用成功' : '禁用成功')
        this.getCompanysList()
      })
    },
    // 修改状态的提示内容
    stateSet(state) {
      if (state === 1) return '确认启用吗?'
      else return '确认禁用吗?'
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  padding: 20px;
  ::v-deep .el-card__body{
    padding: 20px;
  }
  ::v-deep .el-table th{
    background-color: #fafafa;
    border-bottom: 3px solid #e8e8e8;
}
}
</style>
