<tmplate>
  <div class="app-container">
    <el-card class="box-card">

      <!-- 顶部 -->
      <el-row type="flex" style="margin-bottom: 10px;" justify="space-between">
        <div style="color: pink;font-size: 12px;">说明：目前支持学科和关键字条件筛选</div>
        <el-button size="small" type="success" icon="el-icon-edit">新增试题</el-button>
      </el-row>

      <!-- 表单 -->
      <el-form>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label-width="80px" label="学科">
              <el-select style="width: 100%;" placeholder="请选择">
                <!-- <el-option /> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="二级目录">
              <el-select style="width: 100%;" placeholder="请选择">
                <!-- <el-option /> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="标签">
              <el-select style="width: 100%;" placeholder="请选择">
                <!-- <el-option /> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="关键字">
              <el-input style="width: 100%;" placeholder="根据题干搜索" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="试题类型">
              <el-select style="width: 100%;" placeholder="请选择">
                <!-- <el-option /> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="难度">
              <el-select style="width: 100%;" placeholder="请选择">
                <!-- <el-option /> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="方向">
              <el-select style="width: 100%;" placeholder="请选择">
                <!-- <el-option /> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="录入人">
              <el-select style="width: 100%;" placeholder="请选择">
                <!-- <el-option /> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="题目备注">
              <el-input style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="企业简称">
              <el-input style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市地区" label-width="80px">
              <el-col style="padding-left: 0;" :span="12">
                <el-select placeholder="请选择" />
              </el-col>
              <el-col style="padding-right: 0;" :span="12">
                <el-select placeholder="请选择" />
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-row type="flex" justify="end" align="center">
              <el-button style="height: 32px;" size="mini">清除</el-button>
              <el-button style="height: 32px;" size="mini" type="primary">搜索</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-form>

      <!-- 中间提示信息 -->
      <el-alert
        :title="`共22条数据`"
        type="info"
        :closable="false"
        show-icon
        style="margin-bottom: 20px;"
      />

      <!-- 表格 -->
      <el-table :data="BasicsList" style="width: 100%">
        <el-table-column
          prop="number"
          label="试题编号"
          align="left"
        />
        <el-table-column
          prop="subject"
          label="学科"
          align="left"
        />
        <el-table-column
          prop="catalog"
          label="目录"
          align="left"
        />
        <el-table-column
          prop="questionType"
          label="题型"
          align="left"
        >
          <template v-slot="{row}">
            {{ Number(row.questionType) === 1 ? '单选':'多选' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="question"
          label="题干"
          align="left"
          width="280px"
        >
          <template v-slot="{row}">
            <span v-html="row.question" />
          </template>
        </el-table-column>
        <el-table-column
          prop="addDate"
          label="录入时间"
          align="left"
        >
          <template v-slot="{row}">
            {{ row.addDate | parseTime }}
          </template>
        </el-table-column>
        <el-table-column
          prop="difficulty"
          label="难度"
          align="left"
        />
        <el-table-column
          prop="creator"
          label="录入人"
          align="left"
        />
        <el-table-column
          width="180px"
          label="操作"
          align="left"
        >
          <template>
            <el-button size="small" plain type="primary" icon="el-icon-view" circle />
            <el-button size="small" plain type="success" icon="el-icon-edit" circle />
            <el-button size="small" plain type="danger" icon="el-icon-delete" circle />
            <el-button size="small" plain type="warning" icon="el-icon-check" circle />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getBasicsListApi } from '@/api/questions'
export default {
  data() {
    return {
      page: {
        page: 1,
        pagesize: 10
      },
      formData: {
        subjectID: '', // 学科
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
      BasicsList: [] // 基础试题数据
    }
  },
  created() {
    this.getBasicsList()
  },
  methods: {
    // 获取基础题库列表
    async getBasicsList(formData) {
      const { items, counts } = await getBasicsListApi({ ...this.page, ...formData })
      this.BasicsList = items
      this.counts = counts
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
::v-deep .el-input__inner {
  height: 32px;
    line-height: 32px;
}
::v-deep .el-col-6 {
  height: 50px;
}
}
</style>
