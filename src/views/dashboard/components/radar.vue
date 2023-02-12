<template>
  <!-- 雷达图  图表必须给高和宽度-->
  <div ref="myDiv" class="radar-echart" />
</template>

<script>
// 完整加载过程
// import * as echarts from 'echarts'
// 按需加载
import * as echarts from 'echarts/core' // 引入主模块
import { RadarChart } from 'echarts/charts' // 引入雷达图
// 引入提示框和标题组件
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
// 引入canvas渲染器
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  RadarChart,
  CanvasRenderer
])

export default {
  // 页面渲染完毕事件
  mounted() {
    const myChart = echarts.init(this.$refs.myDiv) // 得到图表实例
    myChart.setOption({
      tooltip: {},

      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#c9c0cb',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { text: '逻辑思维', max: 100 },
          { text: '项目相关', max: 100 },
          { text: '基础知识', max: 100 },
          { text: '理论基础', max: 100 },
          { text: '高阶技术', max: 100 }
        ]
      },
      series: [
        {
          type: 'radar',
          // radarIndex: 1,
          areaStyle: {},
          data: [
            {
              value: [75, 85, 60, 55, 80],
              name: 'A Phone'
            }
          ]
        }
      ]
    })
  }
}
</script>

<style>
.radar-echart {
  position: relative;
  width: 250px;
  height: 150px;
  padding: 0px;
  margin: 0px;
  border-width: 0px;
  cursor: default;
}
</style>
