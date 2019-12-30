<template>
  <div>
    <el-card class="box-card">
      <el-row type="flex" align="middle">
        <el-col :span="2">筛选条件:</el-col>
        <el-col :span="3">
          <el-autocomplete
            style="width:100%;"
            v-model="storeName"
            :fetch-suggestions="querySearchAsyncStoreId"
            value-key="storeName"
            placeholder="请选择店铺"
            @select="handleSelectStoreId"
          ></el-autocomplete>
        </el-col>
      </el-row>
      <br>
      <el-row type="flex" align="middle">
        <el-col :span="2">搜索条件:</el-col>
        <el-col :span="3">
          <el-input type="text" placeholder="订单编号" v-model="searchInfo.orderNo" style="width:100%;"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input type="text" placeholder="客户网名" v-model="searchInfo.onlineName" style="width:100%;"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" plain @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <br>
    <el-table :data="tableData" style="width: 100%;" height="605" highlight-current-row>
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="订单号" show-overflow-tooltip width="130"></el-table-column>
      <el-table-column prop="storeName" label="店铺名称" show-overflow-tooltip width="120"></el-table-column>
      <el-table-column prop="customerNetName" label="客户网名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" :formatter="status" show-overflow-tooltip width="110"></el-table-column>
      <el-table-column prop="customerPlaceId" label="收件人" show-overflow-tooltip width="110"></el-table-column>
      <el-table-column prop="refuseReason" label="审核失败原因" show-overflow-tooltip width="240"></el-table-column>
      <el-table-column prop="receivableMoney" label="总价（元）" show-overflow-tooltip width="130"></el-table-column>
      <el-table-column prop="actualMoney" label="实付金额（元）" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createDatetime" label="下单时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="payDatetime" label="付款时间" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="turndown(scope.row)">驳回</el-button>
          <el-button @click="toCheck(scope.row)">通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchInfo.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      background
      layout="total, sizes, ->, prev, pager, next, jumper"
      :page-size="searchInfo.pageSize"
      :total="total">
    </el-pagination>
    <!-- <el-dialog
      :visible.sync="orderDetaildialogVisible"
      width="70%">
      <div slot="title">
        <div class="content btn" @click="prevOrder">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="content">
          货品编号：{{currentOrder}}
        </div>
        <div class="content btn" @click="nextOrder">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import {mixin} from '@/mixins/index'
export default {
  mixins: [mixin],
  components: {
  },
  data() {
    return {
      dateValue: '',
      orderDetaildialogVisible: false,
      showturndown: false,
      currentOrder: '',
      turndownInfo: '',
      tableData: [],
      storeName: '',
      searchInfo: {
        'orderNo': '',
        'onlineName': '',
        'pageIndex': 1,
        'pageSize': 10,
        'storeId': ''
      },
      total: 0
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    handleSizeChange (size) {
      this.searchInfo.pageSize = size
      this.searchInfo.pageIndex = 1
      this.search()
    },
    handleCurrentChange (index) {
      this.searchInfo.pageIndex = index
      this.search()
    },
    search() {
      this.$http.post('/financeCheck/list', this.searchInfo).then(res => {
        this.tableData = res.data.apiResult
        this.total = res.data.count
      })
    },
    querySearchAsyncStoreId(queryString, cb) {
      this.$http.post('/store/list', {
        'name': queryString,
        'pageIndex': 1,
        'pageSize': 10000
      }).then(res => {
        cb(res.data.apiResult)
      })
    },
    handleSelectStoreId(item) {
      this.searchInfo.storeId = item.id
    },
    turndown(row) {
      this.$prompt('请输入原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$http.post('/financeCheck/turndown', {'orderNo': row.id, 'refuseReason': value}).then(res => {
            this.$message.success(res.data.retMsg || '成功')
            this.search()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    toCheck(row) {
      this.$http.post('/financeCheck/toCheck', {'orderNo': row.id}).then(res => {
        this.$message.success(res.data.retMsg || '成功')
        this.search()
      })
    },
    // orderDetail (row, column, cell, event) {
    //   console.log(row, column, cell, event)
    //   if (column.label === '订单号') {
    //     this.currentOrder = row.orderno
    //     this.orderDetaildialogVisible = true
    //   }
    // },
    cellStyle (row, column, rowIndex, columnIndex) {
      if (row.columnIndex === 1) {
        return 'textDecoration: underline;color: #1d7fff;cursor: pointer;'
      }
      return ''
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
