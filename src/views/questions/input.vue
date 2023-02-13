<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        试题录入
      </div>

      <!-- 表单 -->
      <el-form ref="Form" :model="formDate" :rules="rules">
        <el-form-item prop="subjectID" label-width="120px" label="学科:">
          <el-select v-model="formDate.subjectID" style="width: 400px;">
            <el-option v-for="item in subjectList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="catalogID" label-width="120px" label="目录:">
          <el-select v-model="formDate.catalogID" style="width: 400px;">
            <el-option v-for="item in DirList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="enterpriseID" label-width="120px" label="企业:">
          <el-select v-model="formDate.enterpriseID" style="width: 400px;">
            <el-option v-for="item in CompanysList" :key="item.id" :label="item.company" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="province" label-width="120px" label="城市:">
          <el-col :span="4">
            <el-select v-model="formDate.province" style="width: 190px;">
              <el-option v-for="item in ProvinceList" :key="item" :value="item" :label="item" />
            </el-select>
          </el-col>
          <el-col :span="11">
            <el-select v-model="formDate.city" style="width: 190px;">
              <el-option v-for="item in CityList" :key="item" :value="item" :label="item" />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item prop="direction" label-width="120px" label="方向:">
          <el-select v-model="formDate.direction" style="width: 400px;">
            <el-option v-for="item in QUESTIONS.directionType" :key="item.id" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="questionType" label="题型:" label-width="120px">
          <el-radio-group v-model="formDate.questionType">
            <el-radio v-for="item in QUESTIONS.questionType" :key="item.id" :label="item.id">{{ item.value }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="difficulty" label="难度:" label-width="120px">
          <el-radio-group v-model="formDate.difficulty">
            <el-radio v-for="item in QUESTIONS.difficultyType" :key="item.id" :label="item.id">{{ item.value }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="question" label="题干:" style="height: 239px;;margin-bottom: 22px;" label-width="120px">
          <quill-editor v-model="formDate.question" style="height: 180px;" :options="editorOption" />
        </el-form-item>
        <el-form-item label="选项:" label-width="120px">
          <el-radio-group v-model="formDate.options" style="display: flex;flex-wrap:wrap-reverse;flex-direction: column">
            <el-radio>
              A： <el-input style="width: 240px;height: 36px;margin-bottom: 50px;" />
            </el-radio>
            <el-radio>
              B： <el-input style="width: 240px;height: 36px;margin-bottom: 50px;" />
            </el-radio>
            <el-radio>
              C： <el-input style="width: 240px;height: 36px;margin-bottom: 50px;" />
            </el-radio>
            <el-radio>
              D： <el-input style="width: 240px;height: 36px;margin-bottom: 50px;" />
            </el-radio>
          </el-radio-group>
          <el-button disabled type="danger" size="mini">+增加选项与答案</el-button>
        </el-form-item>
        <el-form-item label="解析视频" label-width="120px">
          <el-input v-model="formDate.videoURL" style="width: 400px;" />
        </el-form-item>
        <el-form-item prop="answer" label="答案解析:" style="height: 239px;;margin-bottom: 22px;" label-width="120px">
          <quill-editor v-model="formDate.answer" style="height: 180px;" :options="editorOption" />
        </el-form-item>
        <el-form-item label="题目备注:" label-width="120px">
          <el-input v-model="formDate.remarks" type="textarea" style="width: 400px;" />
        </el-form-item>
        <el-form-item label-width="120px" label="试题标签:">
          <el-select v-model="formDate.tags" style="width: 400px;">
            <el-option v-for="item in TagsList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label-width="120px">
          <el-button v-if="id === undefined" type="primary" @click="commit">确认提交</el-button>
          <el-button v-else type="success" @click="commit">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import QUESTIONS from '@/api/constant/questions.js'
import { getCompanysListApi, getProvinceApi } from '@/api/enterprise'
import { getDisciplineApi, getDirectorysApi, getTagsListApi, addBasicsApi, getPreviewInfoApi, editBasicsApi } from '@/api/questions'
import Axios from 'axios'
export default {
  data() {
    return {
      id: this.$route.query.id,
      QUESTIONS, // 可枚举文件
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 列表
            ['blockquote'], // 引用，代码块
            ['code-block', 'image', 'video'] // 上传图片、上传视频
          ]
        }
      },
      formDate: {
        subjectID: '', // 学科
        catalogID: '', // 目录
        enterpriseID: '', // 企业
        province: '', // 城市(省份)
        city: '', // 地区
        direction: '', // 方向
        questionType: '', // 题型
        difficulty: '', // 难度
        question: '', // 题干
        options: [
          {
            code: 'A',
            img: '',
            isRight: false,
            title: ''
          }
        ], // 选项
        videoURL: '', // 解析视频
        answer: '', // 答案解析
        remarks: '', // 题目备注
        tags: '' // 试题标签
      },
      rules: {
        subjectID: [{ required: true, message: '请选择学科', trigger: 'blur' }],
        catalogID: [{ required: true, message: '请选择目录', trigger: 'blur' }],
        enterpriseID: [{ required: true, message: '请选择企业', trigger: 'blur' }],
        province: [{ required: true, message: '请选择城市', trigger: 'blur' }],
        direction: [{ required: true, message: '请选择方向', trigger: 'blur' }],
        questionType: [{ required: true, message: '请选择题型', trigger: 'blur' }],
        difficulty: [{ required: true, message: '请选择难度', trigger: 'blur' }],
        question: [{ required: true, message: '请输入题干', trigger: 'blur' }],
        answer: [{ required: true, message: '请输入答案解析', trigger: 'blur' }]

      },

      subjectList: [], // 学科列表
      CompanysList: [], // 企业列表
      DirList: [], // 二级目录列表
      TagsList: [], // 标签列表
      ProvinceList: [], // 省份列表
      CityList: [] // 城市列表

    }
  },
  watch: {
    'formDate.subjectID': {
      async handler(newVal) {
        this.DirList = await getDirectorysApi(newVal) // 获取二级目录
        this.TagsList = await getTagsListApi(newVal) // 获取tags标签
      }
    },
    'formDate.province': {
      handler(newVal) {
        this.getCityList(newVal)
      }
    },
    $route: {
      deep: true,
      handler(newVal) {
        this.formDate = {}
        this.id = undefined
      }
    }
  },
  created() {
    this.getDiscipline()
    this.getCompanys()
    this.getProvince()
    if (this.id !== undefined) this.getPreviewInfo()
  },
  methods: {
    // 获取学科列表
    async getDiscipline() {
      const res = await getDisciplineApi()
      this.subjectList = res
    },
    // 获取企业列表
    async getCompanys() {
      const { items } = await getCompanysListApi({ pagesize: 1000000000000 })
      this.CompanysList = items
    },
    // 获取省份列表
    async getProvince() {
      const { data } = await getProvinceApi()
      this.ProvinceList = data.data
    },
    // 获取城市列表
    async getCityList(province) {
      Axios.get(`http://ajax-api.itheima.net/api/city?pname=${province}`).then(({ data }) => {
        this.CityList = data.data
        this.formDate.city = data.data[0]
      })
    },
    // 提交
    commit() {
      this.$refs.Form.validate(async isOk => {
        if (!isOk) return false
        if (this.id === undefined) {
          await addBasicsApi(this.formDate)
          this.$message.success('添加成功')
        } else {
          await editBasicsApi(this.formDate)
          this.$message.success('修改成功')
        }
        this.$router.push('/questions/list')
      })
    },
    // 获取当前详情数据
    async getPreviewInfo() {
      const res = await getPreviewInfoApi(this.id)
      this.formDate = { ...this.formDate, ...res }
    }
  }
}
</script>

<style lang="scss" scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  ::v-deep .el-input__inner {
  height: 36px;
    line-height: 36px;
}
</style>
