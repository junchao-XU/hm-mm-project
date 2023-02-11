<template>
  <Dialog :title="formDate.id ? '编辑用户' : '添加用户'" :show-dialog.sync="showDialog" @click-ok="commit" @close="close">
    <el-form ref="Form" :model="formDate" :rules="rules">
      <el-form-item prop="shortName" label-width="180px" label="企业名称">
        <el-input v-model="formDate.shortName" style="width: 70%;" />
      </el-form-item>
      <el-form-item prop="company" label-width="180px" label="所属公司">
        <el-input v-model="formDate.company" style="width: 70%;" />
      </el-form-item>
      <el-form-item label-width="180px">
        <div style="margin-top: -10px;">
          https://www.tianyancha.com （在此可查询所属公司全称及简称）
        </div>
      </el-form-item>
      <el-form-item prop="province" label="城市地区" label-width="180px">
        <el-col :span="9">
          <el-select v-model="formDate.province" style="width: 200px;" placeholder="请选择">
            <el-option
              v-for="(item,index) in provinceList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
        <el-col :span="11">
          <el-select v-model="formDate.city" placeholder="请选择">
            <el-option
              v-for="(item,index) in cityList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item prop="tags" label-width="180px" label="方向 (企业标签)">
        <el-input v-model="formDate.tags" style="width: 70%;" />
      </el-form-item>
      <el-form-item prop="remarks" label-width="180px" label="备注">
        <el-input v-model="formDate.remarks" type="textarea" style="width: 70%;" />
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import { addCompanysApi, editCompanysApi } from '@/api/enterprise'
export default {
  props: {
    cityList: { type: Array, default: () => [] }, // 城市列表
    provinceList: { type: Array, default: () => [] }, // 省份列表
    showDialog: { type: Boolean, default: false } // 显示隐藏
  },
  data() {
    return {
      formDate: {
        isFamous: true, // 是否名企
        shortName: '', // 企业名
        city: '', // 城市
        company: '', // 所属公司
        tags: '', // 企业标签
        remarks: '', // 备注
        province: '' // 省份
      },
      rules: {
        shortName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        city: [{ required: true, message: '请输入城市名称', trigger: 'blur' }],
        company: [{ required: true, message: '请输入所属公司', trigger: 'blur' }],
        tags: [{ required: true, message: '请输入企业标签', trigger: 'blur' }],
        remarks: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        province: [{ required: true, message: '请输入省份', trigger: 'blur' }]
      }
    }
  },
  watch: {
    'formDate.province': {
      handler(newVal) {
        this.formDate.city = ''
        this.$emit('getcityList', newVal)
      }
    }
  },
  methods: {
    // 关闭
    close() {
      this.formDate = {
        isFamous: true, // 是否名企
        shortName: '', // 企业名
        city: '', // 城市
        company: '', // 所属公司
        tags: '', // 企业标签
        remarks: '', // 备注
        province: '' // 省份
      }
      this.$refs.Form.resetFields()
      this.$emit('update:showDialog', false)
    },
    // 提交
    commit() {
      this.formDate.isFamous = true
      this.$refs.Form.validate(async isOk => {
        if (!isOk) return false
        if (this.formDate.id) await editCompanysApi(this.formDate)
        else await addCompanysApi(this.formDate)
        this.$message.success(this.formDate.id ? '编辑成功' : '添加成功')
        this.close()
        this.$emit('getCompanysList')
      })
    }
  }
}
</script>

<style>

</style>
