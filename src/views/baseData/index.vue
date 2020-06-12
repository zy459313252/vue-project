<template>
  <el-card style="height: 100%">
    <el-form ref="form" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="质检日期">
            <el-date-picker
              v-model="page.date"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="装维工号">
            <el-input v-model="page.workNum" maxlength="5" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" />
          </el-form-item>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-button plain size="medium" icon="el-icon-search" @click="getList(1)">搜索</el-button>
          <fileUpload :on-success="handleSuccess" :before-upload="beforeUpload" :loading="loading">导入</fileUpload>
          <el-button size="medium" type="danger" @click="batchDelete">批量删除</el-button>
        </el-col>
      </el-row>
      <!-- <div style="margin-bottom:10px;text-align:right">
        <fileUpload :on-success="handleSuccess" :before-upload="beforeUpload">导入</fileUpload>
        <el-button size="medium" type="danger" @click="batchDelete">批量删除</el-button>
      </div> -->
    </el-form>
    <el-table :data="tableData" border @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="80" align="center" />
      <el-table-column prop="workOrderInfo" label="工单信息" width="600" align="center">
        <el-table-column prop="workOrderNum" label="工单编号" width="200" align="center" />
        <el-table-column prop="workCompleteDate" label="工单完成时间" width="200" align="center" />
        <el-table-column prop="workType" label="工单类型" width="200" align="center" />
        <el-table-column prop="overlaySceneType" label="覆盖场景类型" width="200" align="center" />
        <el-table-column prop="bussType" label="业务类型" width="200" align="center" />
        <el-table-column prop="spectralMode" label="分光模式" width="200" align="center" />
        <el-table-column prop="splitRatio" label="分光比" width="200" align="center" />
        <el-table-column prop="boxUniqueIdentification" label="分纤箱唯一标识" width="200" align="center" />
        <el-table-column prop="distributorBoxName" label="分纤箱名称" width="200" align="center" />
        <el-table-column prop="splitterName" label="分光器名称" width="200" align="center">
          <template slot-scope="scope">
            <div class="line-clamp">{{ scope.row.splitterName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="beamSplitterIdentification" label="分光器标识" width="200" align="center" />
        <el-table-column prop="pigtailCodeIdentification" label="尾纤二维码标识" width="200" align="center" />
        <el-table-column prop="portNumber" label="端口号" width="200" align="center" />
      </el-table-column>
      <el-table-column prop="qutfitInfo" label="装维信息" width="600" align="center">
        <el-table-column prop="qutfitNum" label="装维工号" width="200" align="center" />
        <el-table-column prop="qutfitName" label="装维姓名" width="200" align="center" />
        <el-table-column prop="userInfo" label="装维手机号" width="200" align="center" />
        <el-table-column prop="subsidiaryCompany" label="所属代维公司" width="200" align="center">
          <template slot-scope="scope">
            <div class="line-clamp">{{ scope.row.subsidiaryCompany }}</div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="userInfo" label="用户信息" width="600" align="center">
        <el-table-column prop="broadbandAccount" label="宽带账号" width="200" align="center" />
        <el-table-column prop="isHeadCustomer" label="是否头部客户" width="200" align="center" />
        <el-table-column prop="userPhone" label="用户手机号" width="200" align="center" />
        <el-table-column prop="userName" label="用户姓名" width="200" align="center" />
        <el-table-column prop="province" label="省" width="200" align="center" />
        <el-table-column prop="city" label="市" width="200" align="center" />
        <el-table-column prop="area" label="区" width="200" align="center" />
        <el-table-column prop="address" label="详细地址" width="200" align="center">
          <template slot-scope="scope">
            <div class="line-clamp">{{ scope.row.address }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="addressType" label="地址类型" width="200" align="center" />
        <el-table-column prop="owningGrid" label="所属网格" width="200" align="center" />
      </el-table-column>
      <el-table-column prop="qualityInspectionInfo" label="机器质检总体结论" width="600" align="center">
        <el-table-column prop="qualityInspectionResults" label="机器质检结果" width="200" align="center" />
        <el-table-column prop="qualityCompletDate" label="机器质检完成时间" width="200" align="center" />
        <el-table-column prop="reason" label="原因" width="200" align="center" />
      </el-table-column>
      <el-table-column prop="manualReviewInfo" label="人工审核总体结论" width="600" align="center">
        <el-table-column prop="manualReviewResults" label="人工审核结果" width="200" align="center" />
        <el-table-column prop="manualReviewResultsReason" label="人工审核结果原因" width="200" align="center" />
        <el-table-column prop="manualReviewResultsDate" label="人工审核完成时间" width="200" align="center" />
        <el-table-column prop="qualityInspectionIsAccurate" label="机器质检识别结果是否准确" width="200" align="center" />
        <el-table-column prop="inaccurateCause" label="不准确原因" width="200" align="center" />
        <el-table-column prop="remarks" label="备注" width="200" align="center" />
      </el-table-column>
      <el-table-column prop="portInfo" label="端口信息" width="600" align="center">
        <el-table-column prop="totalPort" label="端口总量" width="200" align="center" />
        <el-table-column prop="newlyInstalledNum" label="新装冷接端口量" width="200" align="center" />
        <el-table-column prop="quantityPortsNum" label="存量冷接端口量" width="200" align="center" />
        <el-table-column prop="portUsage" label="占用端口量" width="200" align="center" />
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="page.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="sizes, prev, pager, next, jumper, total"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>
<script>
import fileUpload from '@/components/upload/upload'
import { importBaseDataExeclApi, batchDeleteApi, getBaseDataListApi } from '@/api/baseData'
export default {
  name: '',
  components: { fileUpload },
  data() {
    return {
      loading: false,
      page: {
        date: '',
        workNum: '',

        pageNum: 1,
        pageSize: 10,
        total: 2
      },
      tableData: [],
      ids: []
    }
  },
  mounted() {
    this.getList(1)
  },
  methods: {
    // 批量删除
    batchDelete() {
      if (this.ids.length <= 0) {
        this.$message({
          message: '请选择需要删除的行',
          type: 'warning'
        })
        return
      }
      batchDeleteApi({ ids: this.ids.join(',') }).then(res => {
        if (res.status !== 200) {
          this.$message({ message: res.msg, type: 'error' })
          return
        }
        console.log(res)
      })
    },
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id)
    },
    handleSuccess() {
      console.log('成功')
    },
    // 文件上传钩子
    beforeUpload(file) {
      console.log('file', file)
      if (this.loading === true) return
      this.loading = true
      importBaseDataExeclApi(file).then(res => {
        this.loading = false
        console.log(res)
      })
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getList(1)
    },
    handleCurrentChange(val) {
      this.getList(val)
    },
    getList(pageNum) {
      if (pageNum) {
        this.page.pageNum = pageNum
      }
      if (!this.page.date) {
        this.page.date = ''
      }
      console.log('this.page', this.page)
      getBaseDataListApi(this.page).then(res => {
        this.tableData = res.data.rows
        this.page.total = res.data.total
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-pagination {
  margin-top: 30px;
  text-align: right;
  position: relative;
  font-size: 15px;
}
.el-button {
  margin-left: 10px;
}
>>> .el-pagination__sizes {
  position: absolute;
  top: 0;
  left: 0;
}
>>> .el-pagination .el-select .el-input {
  margin-left: -10px;
}
.el-pagination__total {
  margin-left: 15px;
}
>>> .el-table th,  >>>.el-table td {
  padding: 4px 0;
}

// >>> .el-pagination .el-select .el-input .el-input__inner {
//   margin-left: -10px
// }
</style>
