<template>
  <Dialog title="题目预览" :show-dialog.sync="showDialog" :btn-show="false" @close="close">
    <el-row :gutter="20">
      <el-col :span="6">
        【题型】：{{ tixing() }}
      </el-col>
      <el-col :span="6">
        【编号】：{{ formDate.id }}
      </el-col>
      <el-col :span="6">
        【难度】：{{ Deff() }}
      </el-col>
      <el-col :span="6">
        【标签】：{{ formDate.tags }}
      </el-col>
      <el-col :span="6">
        【学科】：{{ formDate.subjectName }}
      </el-col>
      <el-col :span="6">
        【目录】：{{ formDate.directoryName }}
      </el-col>
      <el-col :span="6">
        【方向】：{{ formDate.direction }}
      </el-col>
    </el-row>

    <hr>

    <!-- 单选 -->
    <div v-if="formDate.questionType === '1'">
      【题干】：
      <p style="color: blue;" v-html="formDate.question" />
      <div>
        <div style="padding-bottom: 5px;">单选题 选项：（以下选中的选项为正确答案）</div>
        <div v-for="item in formDate.options" :key="item.id" style="padding: 8px 0px;">
          <el-radio v-model="item.isRight" :label="1">{{ item.title }}</el-radio>
        </div>
      </div>
    </div>

    <!-- 多选 -->
    <div v-else-if="formDate.questionType === '2'">
      【题干】：
      <p style="color: blue;">123123</p>
      <div>
        <div style="padding-bottom: 5px;">单选题 选项：（以下选中的选项为正确答案）</div>
        <div v-for="item in formDate.options" :key="item.id" style="padding: 8px 0px;">
          <el-checkbox v-model="checked">{{ item.title }}</el-checkbox>
        </div>
      </div>
    </div>

    <!-- 简答 -->
    <div v-else />

    <hr>
    <!-- 参考答案 -->
    <div>
      <div>
        【参考答案】：<el-button size="mini" type="danger" @click="VideoShow = true">视频答案预览</el-button>
      </div>
      <!-- <video src="123" /> -->
      <video v-if="VideoShow" :src="formDate.videoURL" muted preload="auto" controls width="400" height="300" />
    </div>

    <hr>

    <!-- 答案解析 -->
    <p style="height: 20px; display: flex;justify-content:start;align-items: center;">
      <span>【答案解析】：</span><span v-html="formDate.answer" />
    </p>

    <hr>

    <!-- 题目备注 -->
    <p>
      【题目备注】：{{ formDate.remarks }}
    </p>
    <el-row type="flex" justify="end">
      <el-button size="medium" type="primary" @click="close">关闭</el-button>
    </el-row>
  </Dialog>
</template>

<script>
import QUESTIONS from '@/api/constant/questions.js'
export default {
  props: {
    showDialog: { type: Boolean, default: false } // 控制弹窗
  },
  data() {
    return {
      checked: true,
      QUESTIONS,
      VideoShow: false,
      formDate: {
        questionType: '', // 题型
        id: '', // 编号
        difficulty: '', // 难度
        tags: '', // 标签
        subjectName: '', // 学科
        directoryName: '', // 目录
        direction: '', // 方向
        question: '', // 题干
        options: [], // 选项
        videoURL: '', // 视频url地址
        answer: '', // 答案解析
        remarks: '' // 题目备注
      }
    }
  },
  methods: {
    // 关闭
    close() {
      this.VideoShow = false
      this.$emit('update:showDialog', false)
    },
    // 遍历难易程度
    Deff() {
      return QUESTIONS.difficultyType.find(i => i.id === this.formDate.difficulty) ? QUESTIONS.difficultyType.find(i => i.id === this.formDate.difficulty).value : '未知'
    },
    // 题型
    tixing() {
      return QUESTIONS.questionType.find(i => i.id === Number(this.formDate.questionType))?.value
    }
  }
}
</script>

<style lang="scss" scoped>
hr{
  box-sizing: content-box;
    height: 0;
    overflow: visible;
}
::v-deep {
  .el-col-6 {
  height: 36px;
}
}
</style>
