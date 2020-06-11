<template>
  <el-card style="width:100%; height: 100%">
    <el-form ref="form" :model="fortable" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="质检日期">
            <el-date-picker
              v-model="fortable.date"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
              />
            </el-date-picker></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合格率不低于" label-width="120px">
            <div style="display: flex; flex-direction: row">
              <el-input
                v-model="fortable.percent"
                onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
              />
              <span style="margin-left: 10px">%</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-button plain size="medium" icon="el-icon-search" @click="hanldeSearch">搜索</el-button>
          <el-button type="primary" size="medium" icon="el-icon-download" @click="handleExport">导出</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%; overflow: auto" border empty-text="暂无数据">
        <el-table-column label="当日质检分析" align="center">
          <el-table-column label="区县" prop="province" align="center" />
          <el-table-column label="当日识别率" prop="rateOfDay" align="center" />
          <el-table-column label="当日工单总量" prop="ordersOfDay" align="center" />
          <el-table-column label="合格" prop="qualified" align="center">
            <el-table-column label="占比" prop="qualifiedProportion" align="center" />
            <el-table-column label="工单量" prop="qualifiedCount" align="center" />
          </el-table-column>
          <el-table-column label="不合格" prop="failed" align="center">
            <el-table-column label="占比" prop="failedProportion" align="center" />
            <el-table-column label="工单量" prop="failedCount" align="center" />
          </el-table-column>
          <el-table-column label="场景不支持" prop="SupProportio" align="center">
            <el-table-column label="占比" prop="sceneNotSupProportion" align="center" />
            <el-table-column label="工单量" prop="sceneNotSupCount" align="center" />
          </el-table-column>
          <el-table-column label="疑似不合格" prop="FailureProportion" align="center">
            <el-table-column label="占比" prop="suspectedFailureProportion" align="center" />
            <el-table-column label="工单量" prop="suspectedFailureCount" align="center" />
          </el-table-column>
          <el-table-column label="无法识别" prop=" unrecognized" align="center">
            <el-table-column label="占比" prop="unrecognizedProportion" align="center" />
            <el-table-column label="工单量" prop="unrecognizedCount" align="center" />
          </el-table-column>
        </el-table-column>
        <el-table-column label="月度累计分析" prop="mrate" align="center">
          <el-table-column label="当日识别率" prop="mrateOfDay" align="center" />
          <el-table-column label="当日工单总量" prop="mrateOfDay" align="center" />
          <el-table-column label="合格" prop="mqualified" align="center">
            <el-table-column label="占比" prop="mqualifiedProportion" align="center" />
            <el-table-column label="工单量" prop="mqualifiedCount" align="center" />
          </el-table-column>
          <el-table-column label="不合格" prop="mfailed" align="center">
            <el-table-column label="占比" prop="mfailedProportion" align="center" />
            <el-table-column label="工单量" prop="mfailedCount" align="center" />
          </el-table-column>
          <el-table-column label="场景不支持" prop="msceneNotSup" align="center">
            <el-table-column label="占比" prop="msceneNotSupProportion" align="center" />
            <el-table-column label="工单量" prop="msceneNotSupCount" align="center" />
          </el-table-column>
          <el-table-column label="疑似不合格" prop="msuspectedFailure" align="center">
            <el-table-column label="占比" prop="msuspectedFailureProportion" align="center" />
            <el-table-column label="工单量" prop="msuspectedFailureCount" align="center" />
          </el-table-column>
          <el-table-column label="无法识别" prop="munrecognized" align="center">
            <el-table-column label="占比" prop="munrecognizedProportion" align="center" />
            <el-table-column label="工单量" prop="munrecognizedCount" align="center" />
          </el-table-column>
        </el-table-column>
        <el-table-column width="150" label=" 合格率参考全省前六指标考核低于97.99%考核线数" prop="passRateLow" align="center" />
        <el-table-column label="本月考核金额" prop="assessmentAmount" align="center" />
        <el-table-column label="智能图片质检通过率" prop="qualityInspection" align="center" />
      </el-table>
    </el-form>
    <!-- <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col> <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>-->
  </el-card>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
// import PanelGroup from './components/PanelGroup'
// import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

// const lineChartData = {
//   newVisitis: {
//     expectedData: [100, 120, 161, 134, 105, 160, 165],
//     actualData: [120, 82, 91, 154, 162, 140, 145]
//   },
//   messages: {
//     expectedData: [200, 192, 120, 144, 160, 130, 140],
//     actualData: [180, 160, 151, 106, 145, 150, 130]
//   },
//   purchases: {
//     expectedData: [80, 100, 121, 104, 105, 90, 100],
//     actualData: [120, 90, 100, 138, 142, 130, 130]
//   },
//   shoppings: {
//     expectedData: [130, 140, 141, 142, 145, 150, 160],
//     actualData: [120, 82, 91, 154, 162, 140, 130]
//   }
// }
import { getTableApi } from '@/api/statisticalAnalysis'
export default {
  name: 'DashboardAdmin',
  data() {
    return {
      fortable: {
        date: '',
        percent: ''
      },
      tableData: []
      // lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    // handleSetLineChartData(type) {
    //   // this.lineChartData = lineChartData[type]
    // }
    handleInput(e) {
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || ''
    },
    hanldeSearch() {
      if (!this.fortable.date || !this.fortable.percent) return this.$message({ type: 'warning', message: '质检日期与合格率不可为空！' })

      getTableApi(this.fortable.date, Number(this.fortable.percent)).then(res => {
        if (res.status === 200) {
          this.tableData = res.data
        }
      })
    },
    handleExport() {
      if (!this.fortable.date || !this.fortable.percent) return this.$message({ type: 'warning', message: '质检日期与合格率不可为空！' })
      window.open(process.env.VUE_APP_BASE_API + `/imageCount/export?date=${this.fortable.date}&percent=${this.fortable.percent}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
>>> .el-table th,  >>>.el-table td {
  padding: 4px 0;
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
