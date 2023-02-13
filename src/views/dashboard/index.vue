<!-- eslint-disable vue/order-in-components -->
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-row :gutter="20">
        <!-- 第一个卡 -->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card
              class="box-card"
              body-style="padding: 5px 20px; min-height: 230px;"
            >
              <div class="header">
                <span>总答题数量</span>
                <el-tooltip
                  effect="dark"
                  content="指标说明"
                  placement="top"
                  class="el-tooltip el-icon-warning item"
                >
                  <i /></el-tooltip>
              </div>
              <div class="total">260,560</div>
              <div class="trends">
                <span class="top">
                  周同比 12%
                  <i class="el-icon-caret-top" />
                </span>
                <span class="left">
                  日环比 11%
                  <i class="el-icon-caret-bottom" />
                </span>
              </div>
              <div class="hr" />
              <div class="footer">
                <span class="yi">日答题数量</span>
                <span class="er">12,423</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <!-- 第二个卡 -->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card
              class="box-card"
              body-style="padding: 5px 20px; min-height: 230px;"
            >
              <div class="header">
                <span>试题方向</span>
                <el-tooltip
                  effect="dark"
                  content="指标说明"
                  placement="top"
                  class="el-tooltip el-icon-warning item"
                >
                  <i /></el-tooltip>
              </div>
              <div class="chart">
                <!-- 雷达图 -->
                <radar />
              </div>
              <div class="hr" />
              <div class="footer">
                <span class="yi">试题库数量</span>
                <span class="er">10,234</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <!-- 第三个卡 -->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card
              class="box-card"
              body-style="padding: 5px 20px; min-height: 230px;"
            >
              <div class="header">
                <span>试题学科分部</span>
                <el-tooltip
                  effect="dark"
                  content="指标说明"
                  placement="top"
                  class="el-tooltip el-icon-warning item"
                >
                  <i /></el-tooltip>
              </div>
              <div class="chart">
                <!-- 雷达图-饼图 -->
                <piechart />
              </div>
              <div class="hr" />
              <div class="footer">
                <span class="yi">前端试题数量</span>
                <span class="er">5,234</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <!-- 第四个卡 -->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card
              class="box-card"
              body-style="padding: 5px 20px; min-height: 230px;"
            >
              <div class="header">
                <span>上周试题新增</span>
                <el-tooltip
                  effect="dark"
                  content="指标说明"
                  placement="top"
                  class="el-tooltip el-icon-warning item"
                >
                  <i /></el-tooltip>
              </div>
              <div class="chart">
                <!-- 雷达图-柱状 -->
                <columnar />
              </div>
              <div class="hr" />
              <div class="footer">
                <span class="yi">上周新增总量</span>
                <span class="er">1,234</span>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <br>
    <el-card class="box-card" style="position: relative">
      <div
        style="
          position: absolute;
          top: 20px;
          right: 20px;
          color: rgb(153, 153, 153);
        "
      >
        前端与java学科试题走势图
      </div>
      <el-row style="marginleft: -10px; margin-right: -10px">
        <el-col :span="16" style="padding-left: 10px; padding-right: 10px">
          <div class="grid-content bg-purple">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <!-- 前端数据图 -->
              <el-tab-pane label="前端学科" name="first" />
              <!-- java数据图 -->
              <el-tab-pane label="JAVA学科" name="second" />
              <discipline ref="barCharts" />
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="8" style="padding-left: 10px; padding-top: 50px">
          <div class="grid-content bg-purple-light">
            <div>
              <h4>学科试题数量排名</h4>
              <ul style="margin: 0; padding: 0">
                <li style="list-style: none">
                  <!-- 1 -->
                  <el-row class="row" style="margin-bottom: 10px">
                    <el-col :span="3">
                      <div class="circular">1</div>
                    </el-col>
                    <el-col :span="16">前端</el-col>
                    <el-col :span="5">5,234</el-col>
                  </el-row>
                  <!-- 2 -->
                  <el-row class="row" style="margin-bottom: 10px">
                    <el-col :span="3">
                      <div class="circular">2</div>
                    </el-col>
                    <el-col :span="16">java</el-col>
                    <el-col :span="5">3,210</el-col>
                  </el-row>
                  <!-- 3 -->
                  <el-row class="row" style="margin-bottom: 10px">
                    <el-col :span="3">
                      <div class="circular">3</div>
                    </el-col>
                    <el-col :span="16">大数据</el-col>
                    <el-col :span="5">1,294</el-col>
                  </el-row>
                  <!-- 4 -->
                  <el-row class="row" style="margin-bottom: 10px">
                    <el-col :span="3">
                      <div class="light circular">4</div>
                    </el-col>
                    <el-col :span="16">c++</el-col>
                    <el-col :span="5">1,001</el-col>
                  </el-row>
                  <!-- 5 -->
                  <el-row class="row" style="margin-bottom: 10px">
                    <el-col :span="3">
                      <div class="light circular">5</div>
                    </el-col>
                    <el-col :span="16">UI</el-col>
                    <el-col :span="5">934</el-col>
                  </el-row>
                  <!-- 6 -->
                  <el-row class="row" style="margin-bottom: 10px">
                    <el-col :span="3">
                      <div class="light circular">6</div>
                    </el-col>
                    <el-col :span="16">php</el-col>
                    <el-col :span="5">856</el-col>
                  </el-row>
                  <!-- 7 -->
                  <el-row class="row" style="margin-bottom: 10px">
                    <el-col :span="3">
                      <div class="light circular">7</div>
                    </el-col>
                    <el-col :span="16">python</el-col>
                    <el-col :span="5">403</el-col>
                  </el-row>
                  <!-- 8 -->
                  <el-row class="row" style="margin-bottom: 10px">
                    <el-col :span="3">
                      <div class="light circular">8</div>
                    </el-col>
                    <el-col :span="16">测试</el-col>
                    <el-col :span="5">122</el-col>
                  </el-row>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import radar from './components/radar.vue'
import piechart from './components/piechart.vue'
import columnar from './components/columnar.vue'
import discipline from './components/discipline.vue'
export default {
  name: 'Dashboard',
  components: { radar, piechart, columnar, discipline },
  computed: {
    ...mapGetters(['name'])
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      const option = this.$refs.barCharts.option
      if (tab.index === '0') {
        option.yAxis = {
          show: true,
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
        }
        option.series = [
          {
            data: [100, 120, 161, 134, 105, 160, 165, 100, 120, 161, 134, 105],
            type: 'line',
            smooth: true
          }
        ]
      } else {
        option.yAxis = {
          type: 'value',
          max: 200,
          min: 0,
          minInterval: 6,
          interval: 50, // 每次增加几个
          // 修改xy轴颜色
          axisLabel: {
            textStyle: {
              color: 'blue'
            }
          }
        }
        option.series = [
          {
            data: [200, 192, 120, 144, 160, 130, 140, 105, 160, 165, 100, 120],
            type: 'line',
            smooth: true
          }
        ]
      }

      this.$refs.barCharts.charts.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  // padding: 5px 20px;
  min-height: 230px;
  .header {
    height: 25px;

    line-height: 25px;
    span {
      color: #97a8be;
      font-size: 14px;
    }
    .item {
      color: #97a8be;
      float: right;
      padding: 3px 0;
      font-size: 16px;
    }
  }
  .total {
    font-size: 30px;
    height: 140px;
    line-height: 140px;
    padding-left: 20px;
  }
  .trends {
    height: 22px;
    font-size: 14px;
    line-height: 22px;
    .top {
      i {
        color: red;
      }
    }
    .left {
      margin-left: 20px;
    }
  }
  .hr {
    border-top: 1px solid #e8e8e8;
    margin: 0 0 10px 0;
  }
  .footer {
    .yi {
      font-size: 14px;
      line-height: 22px;
    }
    .er {
      margin-left: 8px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
    }
  }
  .chart {
    height: 160px;
  }
  ul {
    .row {
      .circular {
        width: 20px;
        height: 20px;
        background-color: #314659;
        color: #fff;
        text-align: center;
        font-size: 12px;
        line-height: 20px;
        font-weight: 600;
        border-radius: 50%;
      }
      .light {
        background-color: #f5f5f5;
        color: #565656;
      }
    }
  }
}

.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  .right-menu-item {
    color: #000;
  }
}
</style>
