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
                  <i
                /></el-tooltip>
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
                  <i
                /></el-tooltip>
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
                  <i
                /></el-tooltip>
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
                  <i
                /></el-tooltip>
              </div>
              <div class="total">260,560</div>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import radar from './components/radar.vue'
import piechart from './components/piechart.vue'

export default {
  name: 'Dashboard',
  components: { radar, piechart },
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  padding: 5px 20px;
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
