export default {
  // 试题类型
  questionType: [
    {
      value: '单选',
      id: '1'
    },
    {
      value: '多选',
      id: '2'
    },
    {
      value: '简答',
      id: '3'
    }
  ],
  // 难度类型
  difficultyType: [
    {
      value: '简单',
      id: '1'
    },
    {
      value: '一般',
      id: '2'
    },
    {
      value: '困难',
      id: '3'
    }
  ],
  // 方向类型
  directionType: [
    {
      id: 1,
      value: 'o2o'
    },
    {
      id: 2,
      value: '外包服务'
    },
    {
      id: 3,
      value: '企业服务'
    },
    {
      id: 4,
      value: '互联网金融'
    },
    {
      id: 5,
      value: '企业咨询'
    },
    {
      id: 6,
      value: '互联网'
    },
    {
      id: 7,
      value: '电子商务'
    },
    {
      id: 8,
      value: '其他'
    }
  ],
  // 审核类型
  chkStateType: [
    {
      id: '0',
      value: '待审核'
    },
    {
      id: '1',
      value: '已审核'
    },
    {
      id: '2',
      value: '拒绝'
    }
  ],
  // 发布状态
  releaseType: [
    {
      id: '0',
      value: '已发布'
    },
    {
      id: '1',
      value: '已下架'
    }
  ]
}
