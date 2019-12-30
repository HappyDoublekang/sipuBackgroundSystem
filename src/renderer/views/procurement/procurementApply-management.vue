<template>
  <div>
    <el-card class="box-card">
      <el-row type="flex" align="middle">
        <el-col :span="2">筛选条件:</el-col>
        <el-col :span="3">
          <el-select placeholder="货品编码" style="width:100%;"></el-select>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-select placeholder="品牌" style="width:100%;"></el-select>
        </el-col>
      </el-row>
      <br>
      <el-row type="flex" align="middle">
        <el-col :span="2">搜索条件:</el-col>
        <el-col :span="3">
          <el-input type="text" placeholder="订单编号" style="width:100%;"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input type="text" placeholder="发件人" style="width:100%;"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input type="text" placeholder="收货人" style="width:100%;"></el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" plain>搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <br>
    <el-row type="flex" align="middle" justify="start">
      <el-col :span="2">
        <el-button type="primary" size="mini">修改</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="mini">生成采购单</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="mini">撤销采购</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="mini" @click="newProcurement">新建</el-button>
      </el-col>
    </el-row>
    <br>
    <el-table :data="tableData" style="width: 100%;" height="605" highlight-current-row @cell-click="orderDetail" :cell-style="cellStyle">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="orderno" label="货品编号" show-overflow-tooltip width="130"></el-table-column>
      <el-table-column prop="status" label="供应商" show-overflow-tooltip width="120"></el-table-column>
      <el-table-column prop="name" label="联系方式" show-overflow-tooltip></el-table-column>
      <el-table-column prop="shou" label="名称" show-overflow-tooltip width="110"></el-table-column>
      <el-table-column prop="phone" label="联系人" show-overflow-tooltip width="110"></el-table-column>
      <el-table-column prop="fail" label="报价" show-overflow-tooltip width="240"></el-table-column>
      <el-table-column prop="sumprice" label="状态" show-overflow-tooltip width="130"></el-table-column>
    </el-table>
    <br>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      background
      layout="total, sizes, ->, prev, pager, next, jumper"
      :page-size="100"
      :total="400">
    </el-pagination>
    <el-dialog
      :visible.sync="newProcurementDialogVisible"
      title="新建"
      width="80%">
      <newProcurement></newProcurement>
    </el-dialog>
  </div>
</template>
<script>
import newProcurement from './newProcurement.vue'
export default {
  components: {
    newProcurement
  },
  data() {
    return {
      newProcurementDialogVisible: false,
      tableData: [
        {
          orderno: '1234567890ABCD',
          status: '字符最多六个',
          name: '字符最多可以有十个字',
          shou: '字最多五个',
          phone: '17704628697',
          fail: '字符最多可以拥有十三个字啊',
          sumprice: '12345.00',
          trueprice: '12345.00',
          orderdate: '2019.05.12 01:01:01',
          paydate: '2019.05.12 01:01:01'
        },
        {
          orderno: '1234567890ABCD',
          status: '字符最多六个',
          name: '字符最多可以有十个字',
          shou: '字最多五个',
          phone: '17704628697',
          fail: '字符最多可以拥有十三个字啊',
          sumprice: '12345.00',
          trueprice: '12345.00',
          orderdate: '2019.05.12 01:01:01',
          paydate: '2019.05.12 01:01:01'
        },
        {
          orderno: '1234567890ABCD',
          status: '字符最多六个',
          name: '字符最多可以有十个字',
          shou: '字最多五个',
          phone: '17704628697',
          fail: '字符最多可以拥有十三个字啊',
          sumprice: '12345.00',
          trueprice: '12345.00',
          orderdate: '2019.05.12 01:01:01',
          paydate: '2019.05.12 01:01:01'
        },
        {
          orderno: '1234567890ABCD',
          status: '字符最多六个',
          name: '字符最多可以有十个字',
          shou: '字最多五个',
          phone: '17704628697',
          fail: '字符最多可以拥有十三个字啊',
          sumprice: '12345.00',
          trueprice: '12345.00',
          orderdate: '2019.05.12 01:01:01',
          paydate: '2019.05.12 01:01:01'
        },
        {
          orderno: '1234567890ABCD',
          status: '字符最多六个',
          name: '字符最多可以有十个字',
          shou: '字最多五个',
          phone: '17704628697',
          fail: '字符最多可以拥有十三个字啊',
          sumprice: '12345.00',
          trueprice: '12345.00',
          orderdate: '2019.05.12 01:01:01',
          paydate: '2019.05.12 01:01:01'
        },
        {
          orderno: '1234567890ABCD',
          status: '字符最多六个',
          name: '字符最多可以有十个字',
          shou: '字最多五个',
          phone: '17704628697',
          fail: '字符最多可以拥有十三个字啊',
          sumprice: '12345.00',
          trueprice: '12345.00',
          orderdate: '2019.05.12 01:01:01',
          paydate: '2019.05.12 01:01:01'
        },
        {
          orderno: '1234567890ABCD',
          status: '字符最多六个',
          name: '字符最多可以有十个字',
          shou: '字最多五个',
          phone: '17704628697',
          fail: '字符最多可以拥有十三个字啊',
          sumprice: '12345.00',
          trueprice: '12345.00',
          orderdate: '2019.05.12 01:01:01',
          paydate: '2019.05.12 01:01:01'
        },
        {
          orderno: '1234567890ABCD',
          status: '字符最多六个',
          name: '字符最多可以有十个字',
          shou: '字最多五个',
          phone: '17704628697',
          fail: '字符最多可以拥有十三个字啊',
          sumprice: '12345.00',
          trueprice: '12345.00',
          orderdate: '2019.05.12 01:01:01',
          paydate: '2019.05.12 01:01:01'
        },
        {
          orderno: '1234567890ABCD',
          status: '字符最多六个',
          name: '字符最多可以有十个字',
          shou: '字最多五个',
          phone: '17704628697',
          fail: '字符最多可以拥有十三个字啊',
          sumprice: '12345.00',
          trueprice: '12345.00',
          orderdate: '2019.05.12 01:01:01',
          paydate: '2019.05.12 01:01:01'
        },
        {
          orderno: '1234567890ABCD',
          status: '字符最多六个',
          name: '字符最多可以有十个字',
          shou: '字最多五个',
          phone: '17704628697',
          fail: '字符最多可以拥有十三个字啊',
          sumprice: '12345.00',
          trueprice: '12345.00',
          orderdate: '2019.05.12 01:01:01',
          paydate: '2019.05.12 01:01:01'
        },
        {
          orderno: '1234567890ABCD',
          status: '字符最多六个',
          name: '字符最多可以有十个字',
          shou: '字最多五个',
          phone: '17704628697',
          fail: '字符最多可以拥有十三个字啊',
          sumprice: '12345.00',
          trueprice: '12345.00',
          orderdate: '2019.05.12 01:01:01',
          paydate: '2019.05.12 01:01:01'
        },
        {
          orderno: '1234567890ABCD',
          status: '字符最多六个',
          name: '字符最多可以有十个字',
          shou: '字最多五个',
          phone: '17704628697',
          fail: '字符最多可以拥有十三个字啊',
          sumprice: '12345.00',
          trueprice: '12345.00',
          orderdate: '2019.05.12 01:01:01',
          paydate: '2019.05.12 01:01:01'
        }
      ],
      currentPage: 1
    }
  },
  methods: {
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
      if (column.label === '客户姓名') {
        this.currentOrder = row.orderno
        this.invoicesInfoDialogVisible = true
      }
    },
    cellStyle (row, column, rowIndex, columnIndex) {
      if (row.columnIndex === 1) {
        return 'textDecoration: underline;color: #1d7fff;cursor: pointer;'
      }
      return ''
    },
    newProcurement () {
      this.newProcurementDialogVisible = true
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
