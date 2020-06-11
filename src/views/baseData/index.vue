<template>
  <el-card style="height: 100%">
    <el-row>
      <!-- <el-col :span="12">工单明细列表</el-col> -->
      <el-col style="text-align: right; padding-bottom: 20px">
        <fileUpload :on-success="handleSuccess" :before-upload="beforeUpload">导入</fileUpload>
        <el-button size="medium" type="danger" @click="batchDelete">批量删除</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%; overflow: auto; max-height: 760px; background: red" border @selection-change="handleSelectionChange">

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
        <el-table-column prop="splitterName" label="分光器名称" width="200" align="center" />
        <el-table-column prop="beamSplitterIdentification" label="分光器标识" width="200" align="center" />
        <el-table-column prop="pigtailCodeIdentification" label="尾纤二维码标识" width="200" align="center" />
        <el-table-column prop="portNumber" label="端口号" width="200" align="center" />
      </el-table-column>
      <el-table-column prop="qutfitInfo" label="装维信息" width="600" align="center">
        <el-table-column prop="qutfitNum" label="装维工号" width="200" align="center" />
        <el-table-column prop="qutfitName" label="装维姓名" width="200" align="center" />
        <el-table-column prop="userInfo" label="装维手机号" width="200" align="center" />
        <el-table-column prop="subsidiaryCompany" label="所属代维公司" width="200" align="center" />
      </el-table-column>
      <el-table-column prop="userInfo" label="用户信息" width="600" align="center">
        <el-table-column prop="broadbandAccount" label="宽带账号" width="200" align="center" />
        <el-table-column prop="isHeadCustomer" label="是否头部客户" width="200" align="center" />
        <el-table-column prop="userPhone" label="用户手机号" width="200" align="center" />
        <el-table-column prop="userName" label="用户姓名" width="200" align="center" />
        <el-table-column prop="province" label="省" width="200" align="center" />
        <el-table-column prop="city" label="市" width="200" align="center" />
        <el-table-column prop="area" label="区" width="200" align="center" />
        <el-table-column prop="address" label="详细地址" width="200" align="center" />
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
import { importBaseDataExeclApi, batchDeleteApi } from '@/api/baseData'
export default {
  name: '',
  components: { fileUpload },
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 2
      },
      tableData: [
        {
          id: 1,
          workOrderNum: '111111',
          workCompleteDate: '111111',
          workType: '111111',
          overlaySceneType: '11111',
          bussType: '11111',
          spectralMode: '11111',
          splitRatio: '11111',
          boxUniqueIdentification: '1111',
          distributorBoxName: '11111',
          splitterName: '11111',
          beamSplitterIdentification: '1111',
          pigtailCodeIdentification: '1111',
          portNumber: '1111',
          qutfitNum: '111',
          qutfitName: '1111',
          subsidiaryCompany: '1111',
          broadbandAccount: '1111',
          isHeadCustomer: '是',
          userPhone: '111',
          userName: '111',
          province: '浙江',
          city: '杭州',
          area: 'bingjiang',
          address: '11',
          addressType: '11',
          owningGrid: '111',
          qualityInspectionResults: '111',
          qualityCompletDate: '11',
          reason: '11',
          manualReviewResults: '11',
          manualReviewResultsReason: '11',
          manualReviewResultsDate: '111',
          qualityInspectionIsAccurate: '11',
          inaccurateCause: '11',
          remarks: '111',
          totalPort: '111',
          newlyInstalledNum: '11',
          quantityPortsNum: '111',
          portUsage: '111'
        }
      ],
      idArr: []
    }
  },
  methods: {
    // 批量删除
    batchDelete() {
      if (this.idArr.length <= 0) {
        // alert()
        return
      }
      batchDeleteApi({ idArr: this.idArr }).then(res => {
        console.log(res)
      })
    },
    handleSelectionChange(val) {
      this.idArr = val.map(item => item.id)
    },
    handleSuccess() {
      console.log('成功')
    },
    // 文件上传钩子
    beforeUpload(file) {
      console.log('file', file)
      importBaseDataExeclApi(file).then(res => {
        console.log(res)
      })
    },
    handleSizeChange(val) {
      this.page.pageSize = val
    },
    handleCurrentChange(val) {
      this.page.pageSize = val
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
 >>> .el-table th, >>> .el-table td {
  padding: 4px 0;
}

// >>> .el-pagination .el-select .el-input .el-input__inner {
//   margin-left: -10px
// }
</style>
