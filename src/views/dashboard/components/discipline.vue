<template>
  <!-- 前端学科 - 折线图 图表必须给高和宽度-->
  <div ref="myDiv" class="radar-echart" />
</template>

<script>
import * as echarts from 'echarts/core'
import { GridComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition])

export default {
  // 页面渲染完毕事件
  mounted() {
    const myChart = echarts.init(this.$refs.myDiv) // 得到图表实例
    myChart.setOption({
      xAxis: {
        type: 'category',
        data: [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月'
        ],
        // 修改文字
        axisLabel: {
          textStyle: {
            color: 'blue'
          }
        },
        /* 改变x轴颜色*/
        axisLine: {
          lineStyle: {
            color: 'blue',
            width: 1 // 这里是为了突出显示加上的
          }
        }
      },
      yAxis: {
        type: 'value',
        max: 180,
        min: 0,
        minInterval: 6,
        interval: 30, // 每次增加几个
        // 修改xy轴颜色
        axisLabel: {
          textStyle: {
            color: 'blue'
          }
        }
      },
      grid: {
        // 让图表占满容器
        top: '10%',
        left: '5%',
        right: '0px',
        bottom: '15%'
      },

      series: [
        {
          data: [100, 120, 161, 134, 105, 160, 165, 100, 120, 161, 134, 105],
          type: 'line',
          smooth: true
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.radar-echart {
  position: relative;
  width: 845px;
  height: 300px;
  padding: 0px;
  margin: 0px;
  border-width: 0px;
  cursor: default;
}
</style>
