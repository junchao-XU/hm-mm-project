<template>
  <!-- 饼图  图表必须给高和宽度-->
  <div ref="myDiv" class="radar-echart" />
</template>

<script>
import * as echarts from 'echarts/core'
import { ToolboxComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  ToolboxComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
])

export default {
  // 页面渲染完毕事件
  mounted() {
    const myChart = echarts.init(this.$refs.myDiv) // 得到图表实例
    myChart.setOption({
      // legend: {
      //   top: 'bottom'
      // },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true }
          // dataView: { show: true, readOnly: false },
          // restore: { show: true }
          // saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          // radius: [50, 250],
          center: ['50%', '50%'], // 图片位置位置
          roseType: 'area',
          itemStyle: {
            borderRadius: 0 // 改变形状0是方形
          },
          data: [
            { value: 40, name: '前端' },
            { value: 28, name: 'java' },
            { value: 26, name: 'python' },
            { value: 22, name: 'c++' },
            { value: 18, name: 'UI' }
          ]
        }
      ]
    })
  }
}
</script>

<style lang="scss" scoped>
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
