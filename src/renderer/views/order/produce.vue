<template>
  <div>
    <el-card class="box-card">
      <el-row type="flex" align="middle">
        <el-col :span="2">筛选条件:</el-col>
        <el-col :span="3">
          <el-select placeholder="生产小组" v-model="searchInfo.orderStatus" style="width:100%;">
            <el-option v-for="(item,index) of workGroup" :key="index" :label="item" :value="index">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-select placeholder="订单状态" v-model="searchInfo.orderStatus" style="width:100%;">
            <el-option v-for="(item,index) of orderStatus" :key="index" :label="item" :value="index">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <br>
      <el-row type="flex" align="middle">
        <el-col :span="2">搜索条件:</el-col>
        <el-col :span="3">
          <el-input type="text" placeholder="生产单号" style="width:100%;" v-model="searchInfo.orderNo"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input type="text" placeholder="出库单号" style="width:100%;" v-model="searchInfo.productionOrderNo"></el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" plain @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <br>
    <el-row type="flex" align="middle" justify="start">
      <el-col :span="2">
        <el-button type="primary" size="mini" @click="createOrder">新建生产单</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="mini" >生产单派发</el-button>
      </el-col>
      <!-- <el-col :span="2">
        <el-button type="info" size="mini">撤回</el-button>
      </el-col> -->
    </el-row>
    <br>
    <el-table :data="tableData" style="width: 100%;" height="605" highlight-current-row @cell-click="orderDetail" :cell-style="cellStyle">
      <el-table-column type="selection" fixed="left"></el-table-column>
      <el-table-column prop="id" label="生产单号" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="orderStatus" label="生产单状态" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="createUser" label="下单人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="workshopName" label="生产小组" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="orderNo" label="关联订单号" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="createDatetime" label="下单时间" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="productDatetime" label="生产时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="updateDatetime" label="最后更新时间" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" class="sp" @click="retract(scope.row.id)">撤回</el-button>
          <el-button type="text" size="small" class="sp" @click="delProduce(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      background
      layout="total, sizes, ->, prev, pager, next, jumper"
      :page-size="pageInfo.pageSize"
      :total="total">
    </el-pagination>
    <el-dialog
      title="生产开单"
      :visible.sync="newOrderdialogVisible"
      width="65%">
      <produceOrder></produceOrder>
    </el-dialog>
    <el-dialog
      title="订单拆分"
      :visible.sync="orderSplitdialogVisible"
      width="70%">
      <orderSplit></orderSplit>
    </el-dialog>
  </div>
</template>
<script>
import produceOrder from './produceOrder.vue'
export default {
  components: {
    produceOrder
  },
  data() {
    return {
      orderType: 'new',
      orderTitle: '新建订单',
      newOrderdialogVisible: false,
      orderSplitdialogVisible: false,
      closeOrderdialogVisible: false,
      orderDetaildialogVisible: false,
      currentOrder: '',
      tableData: [],
      total: 0,
      pageInfo: {
        pageSize: 20,
        pageIndex: 1
      },
      searchInfo: {
        orderNo: '',
        productionOrderNo: '',
        orderStatus: ''
      },
      orderStatus:[],
      workGroup:[]
    }
  },
  mounted () {
    this.$http.post('/advanceOrder/orderTypeEnum').then(res => {
      this.orderStatus = res.data.apiResult
    });
    this.$http.post('/workGroup/list').then(res => {
      this.workGroup = res.data.apiResult
    });
    this.getOrderList();
  },
  methods: {
    handleSizeChange () {},
    handleCurrentChange () {},
    createOrder () {
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
    getOrderList() {
      this.$http.post('/production/orderList', {...this.pageInfo, ...this.searchInfo}).then(res => {
        this.tableData = res.data.apiResult
        this.total = res.data.total
      })
    },
    search() {
      this.pageInfo.pageIndex = 1
      this.getOrderList()
    },
    retract(id) {
      this.$http.post('/production/retract', {productionOrderNo: id}).then(res => {
        this.$message.success(res.data.retMsg || '成功')
      })
    },
    delProduce(id) {
      this.$http.post('/production/delete', {productionOrderNo: id}).then(res => {
        this.$message.success(res.data.retMsg || '成功')
      })
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
/deep/ .el-table{
  padding: 0;
}
/deep/ .el-button.sp{
  padding: 0;
  min-width: 0px; 
}
</style>