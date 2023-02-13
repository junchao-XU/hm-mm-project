<template>
  <!-- 柱状图  图表必须给高和宽度-->
  <div ref="myDiv" class="radar-echart" />
</template>

<script>
import * as echarts from 'echarts/core'
import { TooltipComponent, GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer])

export default {
  // 页面渲染完毕事件
  mounted() {
    const myChart = echarts.init(this.$refs.myDiv) // 得到图表实例
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: '10%',
        left: '0px',
        right: '0px',
        bottom: '0px',

        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['周一', '', '周三', '', '周五', '', '周日'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [100, 52, 200, 334, 390, 330, 220]
        }
      ]
    })
  }
}
</script>

<style lang="scss" scoped>
.radar-echart {
  position: relative;
  width: 253px;
  height: 160px;
  padding: 0px;
  margin: 0px;
  border-width: 0px;
  cursor: default;
}
</style>
