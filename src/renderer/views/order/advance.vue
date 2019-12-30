<template>
  <div>
    <el-card class="box-card">
      <el-row type="flex" align="middle">
        <el-col :span="2">筛选条件:</el-col>
        <el-col :span="4">
          <el-autocomplete style="width:100%;" v-model="searchInfo.storeName" :fetch-suggestions="querySearchAsyncStoreId" value-key="storeName" placeholder="请选择店铺" @select="handleSelectStoreId"></el-autocomplete>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-select placeholder="全部订单状态" v-model="searchInfo.orderStatus">
            <el-option v-for="(item,index) of orderStatus" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <br />
      <el-row type="flex" align="middle">
        <el-col :span="2">搜索条件:</el-col>
        <el-col :span="4">
          <el-input placeholder="订单编号" v-model="searchInfo.orderNo" style="width:100%;"></el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-input placeholder="原始订单编号" v-model="searchInfo.originalOrderNo" style="width:100%;"></el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-input placeholder="客户网名" v-model="searchInfo.onlineName" style="width:100%;"></el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" plain @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <br />
    <el-row type="flex" align="middle" justify="start">
      <el-col :span="2">
        <el-button type="primary" size="mini" @click="createOrder">新建</el-button>
      </el-col>
      <!-- <el-col :span="2">
        <el-button type="primary" size="mini" >审核</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="mini" @click="updateOrder">修改</el-button>
      </el-col>-->
      <!-- <el-col :span="2">
        <el-button type="info" size="mini">合并</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="mini" @click="orderSplitdialogVisible = true">拆单</el-button>
      </el-col>-->
      <!-- <el-col :span="2">
        <el-button type="primary" size="mini">冻结</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="mini">解冻</el-button>
      </el-col>-->
      <!-- <el-col :span="2">
        <el-button type="primary" size="mini">刷新</el-button>
      </el-col>-->
      <!-- <el-col :span="2">
        <el-button type="primary" size="mini" @click="closeOrderdialogVisible = true">取消</el-button>
      </el-col>-->
      <el-col :span="2" :offset="4">
        <div style="text-align:right;">
          <el-button type="primary" plain size="mini">颜色标记</el-button>
        </div>
      </el-col>
    </el-row>
    <br />
    <el-table :data="tableData" style="width: 100%;" height="605" highlight-current-row @cell-click="orderDetail" :cell-style="cellStyle">
      <el-table-column prop="id" label="订单号" fixed="left" width="150"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" :formatter="status" width="150"></el-table-column>
      <el-table-column prop="customerNetName" label="客户网名" width="150"></el-table-column>
      <el-table-column prop="realName" label="收件人" width="150"></el-table-column>
      <el-table-column prop="cellphone" label="手机" width="150"></el-table-column>
      <el-table-column prop="refuseReason" label="失败原因" width="150"></el-table-column>
      <el-table-column prop="receivableMoney" label="总价（元）" width="150"></el-table-column>
      <el-table-column prop="actualMoney" label="实付金额（元）" width="150"></el-table-column>
      <el-table-column prop="orderDatetime" label="下单时间" width="150"></el-table-column>
      <el-table-column prop="payDatetime" label="付款时间" width="150"></el-table-column>
      <el-table-column label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toCheck(scope.row.id)">审核</el-button>
          <el-button type="text" size="small" @click="update(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="frozen(scope.row.id)" v-if="scope.row.orderStatus == 5">冻结</el-button>
          <el-button type="text" size="small" @click="unfrozen(scope.row.id)" v-if="scope.row.orderStatus == 6">解冻</el-button>
          <el-button type="text" size="small" @click="cancel(scope.row.id)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchInfo.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      background
      layout="total, sizes, ->, prev, pager, next, jumper"
      :page-size="searchInfo.pageSize"
      :total="total"
    ></el-pagination>
    <el-dialog :title="orderTitle" :visible.sync="newOrderdialogVisible" width="70%">
      <orderInfo :infoType="orderType" @confim="confim"></orderInfo>
    </el-dialog>
    <el-dialog title="订单拆分" :visible.sync="orderSplitdialogVisible" width="70%">
      <orderSplit></orderSplit>
    </el-dialog>
    <el-dialog title="取消订单" :visible.sync="closeOrderdialogVisible" width="50%">
      <div>
        <p style="margin:10px;">确定要取消xxx订单吗？请输入取消原因</p>
        <el-input type="textarea" :rows="4" placeholder="请输入取消原因" resize="none" v-model="textarea"></el-input>
        <p style="text-align:right;margin:5px;">0/200</p>
        <div style="text-align:center;">
          <el-button @click="closeOrderdialogVisible = false" style="margin-right:10px;">取 消</el-button>
          <el-button type="primary" @click="closeOrderdialogVisible = false">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="orderDetaildialogVisible" width="70%">
      <div slot="title">
        <div class="content btn" @click="prevOrder">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="content">货品编号：{{currentOrder}}</div>
        <div class="content btn" @click="nextOrder">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <orderDetail></orderDetail>
    </el-dialog>
  </div>
</template>
<script>
import orderInfo from "./orderInfo.vue";
import orderSplit from "./orderSplit.vue";
import orderDetail from "./orderDetail.vue";
import { mixin } from "@/mixins/index";
export default {
  mixins: [mixin],
  components: {
    orderInfo,
    orderSplit,
    orderDetail
  },
  data() {
    return {
      orderType: "new",
      orderTitle: "新建订单",
      newOrderdialogVisible: false,
      orderSplitdialogVisible: false,
      closeOrderdialogVisible: false,
      orderDetaildialogVisible: false,
      currentOrder: "",
      tableData: [],
      textarea: "",
      searchInfo: {
        isHistory: 0,
        onlineName: "",
        orderNo: "",
        orderStatus: 0,
        originalOrderNo: "",
        pageIndex: 1,
        pageSize: 20,
        sellerFlag: 0,
        serviceRemark: "",
        storeId: ""
      },
      total: 0,
      orderStatus: []
    };
  },
  mounted() {
    this.getAdvanceOrderList();
    this.$http.post("/advanceOrder/orderTypeEnum").then(res => {
      this.orderStatus = res.data.apiResult;
    });
  },
  methods: {
    getAdvanceOrderList() {
      this.$http
        .post("/advanceOrder/list", this.searchInfo)
        .then(res => {
          let data = res.data;
          this.tableData = data.apiResult;
          this.total = data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(size) {
      this.searchInfo.pageSize = size;
      this.getAdvanceOrderList();
    },
    handleCurrentChange(index) {
      this.searchInfo.pageIndex = index;
      this.getAdvanceOrderList();
    },
    querySearchAsyncStoreId(queryString, cb) {
      this.$http
        .post("/store/list", {
          name: queryString,
          pageIndex: 1,
          pageSize: 10000
        })
        .then(res => {
          cb(res.data.apiResult);
        });
    },
    handleSelectStoreId(item) {
      this.searchInfo.storeId = item.id;
    },
    search() {
      this.searchInfo.pageIndex = 1;
      this.getAdvanceOrderList();
    },
    createOrder() {
      this.orderType = "new";
      this.orderTitle = "新建订单";
      this.newOrderdialogVisible = true;
    },
    updateOrder() {
      this.orderType = "update";
      this.orderTitle = "修改订单";
      this.newOrderdialogVisible = true;
    },
    orderDetail(row, column, cell, event) {
      if (column.label === "订单号") {
        this.currentOrder = row.orderno;
        this.orderDetaildialogVisible = true;
      }
    },
    cellStyle(row, column, rowIndex, columnIndex) {
      if (row.columnIndex === 0) {
        return "textDecoration: underline;color: #1d7fff;cursor: pointer;";
      }
      return "";
    },
    confim() {
      this.newOrderdialogVisible = false;
      this.getAdvanceOrderList();
    },
    prevOrder() {
      console.log("prev");
    },
    nextOrder() {
      console.log("next");
    },
    toCheck(id) {
      this.$prompt("请输入审核原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$http
            .post("/advanceOrder/toCheck", {
              orderNo: id,
              reason: value
            })
            .then(res => {
              this.$message.success("成功");
              this.getAdvanceOrderList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    update(id) {},
    frozen(id) {
      this.$prompt("请输入冻结原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$http
            .post("/advanceOrder/frozen", {
              orderNo: id,
              reason: value
            })
            .then(res => {
              this.$message.success("成功");
              this.getAdvanceOrderList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    unfrozen(id) {
      this.$prompt("请输入解冻原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$http
            .post("/advanceOrder/unfrozen", {
              orderNo: id,
              reason: value
            })
            .then(res => {
              this.$message.success("成功");
              this.getAdvanceOrderList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    cancel(id) {
      this.$prompt("请输入取消原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$http
            .post("/advanceOrder/cancel", {
              orderNo: id,
              reason: value
            })
            .then(res => {
              this.$message.success("成功");
              this.getAdvanceOrderList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
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
/deep/ .el-table {
  padding: 0;
}
/deep/ .el-button.el-button--text {
  min-width: 0;
  padding: 0;
}
</style>
