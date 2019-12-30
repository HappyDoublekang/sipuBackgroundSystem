<template>
  <div>
    <el-card class="box-card">
      <el-row type="flex" align="middle">
        <el-col :span="2">搜索条件:</el-col>
        <el-col :span="3">
          <el-input type="text" placeholder="税号" style="width:100%;" v-model="searchForm.serialNo"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input type="text" placeholder="公司名称" style="width:100%;"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input type="text" placeholder="所属订单号" style="width:100%;" v-model="searchForm.orderNo"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input type="text" placeholder="开票人名称" style="width:100%;"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" plain @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <br>
    <el-row type="flex" align="middle" justify="start">
      <el-col :span="2">
        <el-button type="info" size="mini" @click="confirmInvoice">确认开票</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="info" size="mini">驳回</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="info" size="mini" @click="modifySN">修改序列号</el-button>
      </el-col>
    </el-row>
    <br>
    <el-table :data="tableData" style="width: 100%;" height="605" highlight-current-row @cell-click="orderDetail" :cell-style="cellStyle">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="orderNo" label="订单号" show-overflow-tooltip width="130"></el-table-column>
      <el-table-column prop="customerId" label="序列号" show-overflow-tooltip width="120"></el-table-column>
      <el-table-column prop="phone" label="客户名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="订单类型" show-overflow-tooltip width="110"></el-table-column>
      <el-table-column prop="invoiceType" label="发票类型" show-overflow-tooltip width="110" :formatter="invoiceType"></el-table-column>
      <el-table-column prop="title" label="发票抬头" show-overflow-tooltip width="240"></el-table-column>
      <el-table-column prop="taxNo" label="税号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="amount" label="金额" show-overflow-tooltip width="240"></el-table-column>
      <el-table-column prop="createDatetime" label="下单时间" show-overflow-tooltip></el-table-column>
    </el-table>
    <br>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchForm.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      background
      layout="total, sizes, ->, prev, pager, next, jumper"
      :page-size="searchForm.pageSize"
      :total="total">
    </el-pagination>
    <el-dialog
      title="修改序列号"
      :visible.sync="modifySNDialogVisible"
      width="30%">
      <div>
        <el-form ref="form" :model="info" label-width="90px">
          <el-form-item label="原序列号" class="formItem">
            123456789
          </el-form-item>
          <el-form-item label="新序列号" class="formItem">
            <el-input type="text" placeholder="输入新序列号" style="width:100%;"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align:center;">
          <el-button @click="modifySNDialogVisible = false" style="margin-right:10px;">取 消</el-button>
          <el-button type="primary" @click="modifySNDialogVisible = false">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="确认开票"
      :visible.sync="confirmInvoiceDialogVisible"
      width="30%">
      <div>
        <el-form ref="form" :model="info" label-width="90px">
          <el-form-item label="原序列号" class="formItem">
            <el-input type="text" placeholder="输入原始序列号" style="width:100%;"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align:center;">
          <el-button @click="confirmInvoiceDialogVisible = false" style="margin-right:10px;">取 消</el-button>
          <el-button type="primary" @click="confirmInvoiceDialogVisible = false">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mixin } from '../../mixins/index'
export default {
  mixins: [mixin],
  components: {
  },
  data() {
    return {
      modifySNDialogVisible: false,
      confirmInvoiceDialogVisible: false,
      tableData: [],
      searchForm: {
        'invoiceRequestId': 0,
        'orderNo': '',
        'pageIndex': 1,
        'pageSize': 20,
        'serialNo': ''
      },
      total: 0
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    search() {
      this.$http.post('/invoice/list', {
        ...this.searchForm
      }).then(res => {
        let data = res.data
        this.tableData = data.apiResult
        this.total = data.total
      }).catch(err => {
        console.log(err)
      })
    },
    handleSizeChange () {},
    handleCurrentChange () {},
    createOrder () {
      this.orderType = 'new'
      this.orderTitle = '新建订单'
      this.newOrderdialogVisible = true
    },
    updateOrder () {
      this.orderType = 'update'
      this.orderTitle = '修改订单'
      this.newOrderdialogVisible = true
    },
    orderDetail (row, column, cell, event) {
      console.log(row, column, cell, event)
      if (column.label === '订单号') {
        this.currentOrder = row.orderno
        this.orderDetaildialogVisible = true
      }
    },
    cellStyle (row, column, rowIndex, columnIndex) {
      if (row.columnIndex === 1) {
        return 'textDecoration: underline;color: #1d7fff;cursor: pointer;'
      }
      return ''
    },
    prevOrder () {
      console.log('prev')
    },
    nextOrder () {
      console.log('next')
    },
    modifySN () {
      this.modifySNDialogVisible = true
    },
    confirmInvoice () {
      this.confirmInvoiceDialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  display: inline-block;
}
.btn {
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border: 1px solid gainsboro;
  cursor: pointer;
}
</style>
