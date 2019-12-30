<template>
  <div>
    <el-card class="box-card">
      <el-row type="flex" align="middle">
        <el-col :span="2">筛选条件:</el-col>
        <el-col :span="3">
          <el-autocomplete style="width:100%;" v-model="searchInfo.storeName" :fetch-suggestions="querySearchAsyncStoreId" value-key="storeName" placeholder="请选择店铺" @select="handleSelectStoreId"></el-autocomplete>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-select placeholder="全部订单状态" v-model="searchInfo.orderStatus">
            <el-option v-for="(item,index) of orderStatus" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <br />
      <el-row type="flex" align="middle">
        <el-col :span="2">搜索条件:</el-col>
        <el-col :span="3">
          <el-input type="text" placeholder="订单编号" style="width:100%;" v-model="searchInfo.orderNo"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input type="text" placeholder="税号" style="width:100%;" v-model="searchInfo.taxNo"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input type="text" placeholder="发票请求号" style="width:100%;" v-model="searchInfo.invoiceRequestId"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input type="text" placeholder="客户ID" style="width:100%;" v-model="searchInfo.customerId"></el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" plain @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <br />
    <el-row type="flex" align="middle" justify="start">
      <el-col :span="2">
        <el-button type="primary" size="mini" @click="submitInvoice">提交开票</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="info" size="mini" @click="modifyInvoice">修改</el-button>
      </el-col>
    </el-row>
    <br />
    <el-table :data="tableData" style="width: 100%;" height="605" highlight-current-row>
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="orderNo" label="订单号" show-overflow-tooltip width="130"></el-table-column>
      <el-table-column prop="status" label="状态" show-overflow-tooltip width="120"></el-table-column>
      <el-table-column prop="invoiceType" label="发票类别" show-overflow-tooltip :formatter="invoiceType"></el-table-column>
      <el-table-column prop="title" label="发票抬头" show-overflow-tooltip width="240"></el-table-column>
      <el-table-column prop="taxNo" label="税号" show-overflow-tooltip width="130"></el-table-column>
      <el-table-column prop="amount" label="金额" show-overflow-tooltip width="130"></el-table-column>
      <el-table-column prop="createDatetime" label="下单时间" show-overflow-tooltip></el-table-column>
    </el-table>
    <br />
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      background
      layout="total, sizes, ->, prev, pager, next, jumper"
      :page-size="pageInfo.pageSize"
      :total="total"
    ></el-pagination>
    <el-dialog title="修改发票" :visible.sync="submitInvoiceDialogVisible" width="65%"></el-dialog>
    <el-dialog title="修改发票" :visible.sync="modifyInvoiceDialogVisible" width="70%">
      <modifyInvoice></modifyInvoice>
    </el-dialog>
  </div>
</template>
<script>
import modifyInvoice from "./modifyInvoice.vue";
import { mixin } from "../../mixins/index";
export default {
  mixins: [mixin],
  components: {
    modifyInvoice
  },
  data() {
    return {
      orderType: "new",
      orderTitle: "新建订单",
      submitInvoiceDialogVisible: false,
      modifyInvoiceDialogVisible: false,
      currentOrder: "",
      tableData: [],
      currentPage: 1,
      invoiceTypeEnums: [],
      searchInfo: {
        customerId: "",
        invoiceRequestId: "",
        orderNo: "",
        taxNo: "",
        storeId: "",
        orderStatus: ""
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      orderStatus: []
    };
  },
  mounted() {
    this.$http.post("/advanceOrder/orderTypeEnum").then(res => {
      this.orderStatus = res.data.apiResult;
    });
    this.getInvoiceType();
    this.getInvoiceList();
  },
  methods: {
    handleSizeChange(size) {
      this.pageInfo.pageSize = size;
      this.getInvoiceList();
    },
    handleCurrentChange(index) {
      this.pageInfo.pageIndex = index;
      this.getInvoiceList();
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
    submitInvoice() {
      this.submitInvoiceDialogVisible = true;
    },
    modifyInvoice() {
      this.modifyInvoiceDialogVisible = true;
    },
    cellStyle(row, column, rowIndex, columnIndex) {
      if (row.columnIndex === 1) {
        return "textDecoration: underline;color: #1d7fff;cursor: pointer;";
      }
      return "";
    },
    prevOrder() {
      console.log("prev");
    },
    nextOrder() {
      console.log("next");
    },
    getInvoiceType() {
      this.$http.post("/invoiceRequest/invoiceTypeEnums").then(res => {
        this.invoiceTypeEnums = res.data.apiResult;
      });
    },
    getInvoiceList() {
      this.$http
        .post("/invoiceRequest/list", { ...this.search, ...this.pageInfo })
        .then(res => {
          this.tableData = res.data.apiResult;
          this.total = res.data.total;
        });
    },
    search() {
      this.pageInfo.pageIndex = 1;
      this.getInvoiceList();
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
</style>