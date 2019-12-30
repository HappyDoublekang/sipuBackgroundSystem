<template>
  <div>
    <!-- <div class="mgb15">
        <el-button type="primary" @click="exportExcel"><i class="iconfont icon-daochu"></i>导出</el-button>
    </div>-->
    <div class="search-condition">
      <el-form inline ref="searchForm" :model="searchForm" label-width="80px" style="overflow: hidden;">
        <el-col>
          <el-form-item label="搜索条件:">
            <el-input class="w160" v-model="searchForm.netName" placeholder="输入客户网名"></el-input>
            <el-button class="w100" type="primary" plain @click="search">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <el-table resizable border :data="outgoingTable" ref="multipleTable" v-loading="loading" style="width: 100%;" height="605" @cell-click="outgoingDetail" :cell-style="cellStyle">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="left" prop="id" label="原始订单号"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="store" label="店铺名称"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="orderStatus" label="订单状态"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="netName" label="客户网名"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="name" label="收件人"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="phone" label="手机"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="sellCount" label="货品总量（kg）"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="salesman" label="业务员"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="receivableMoney" label="订单金额（元）"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="createDatetime" label="创建时间"></el-table-column>
      <div slot="empty">
        <v-nolist :text="'暂无数据'"></v-nolist>
      </div>
    </el-table>
    <div class="toolbar clearfix">
      <el-pagination
        class="fr"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageinfo.pageIndex"
        :page-size="pageinfo.pageSize"
        :page-sizes="[10,15,20]"
        layout="total,sizes, prev, pager, next, jumper"
        :total="totalItem"
      ></el-pagination>
    </div>
    <el-dialog :visible.sync="warehouseDetaildialogVisible" width="70%">
      <div slot="title">
        <div class="content btn" @click="prevWarehouse">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="content">货品编号：{{currentWarehouse}}</div>
        <div class="content btn" @click="nextWarehouse">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="订单详情" name="outgoing">
            <el-form ref="form" :model="info" label-width="90px">
              <el-row type="flex" align="middle">
                <el-col :span="6">
                  <el-form-item label="订单编号:" class="formItem">{{info.id}}</el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="原始单号:" class="formItem">{{info.orderNo}}</el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="订单状态:" class="formItem">{{info.orderStatus}}</el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="退款状态:" class="formItem">{{info.refundStatus}}</el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle">
                <el-col :span="6">
                  <el-form-item label="店铺名称:" class="formItem">{{info.store}}</el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="货品总量:" class="formItem">{{info.sellCount}}</el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="货品种类数:" class="formItem">{{info.goodsTotal}}</el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="总价:" class="formItem">{{info.receivableMoney}}</el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle">
                <el-col :span="6">
                  <el-form-item label="下单时间:" class="formItem">{{info.orderDatetime}}</el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="付款时间:" class="formItem">{{info.payDatetime}}</el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="发货时间:" class="formItem">{{info.sendDatetime}}</el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle">
                <el-col :span="6">
                  <el-form-item label="客户网名:" class="formItem">{{info.netName}}</el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="客户姓名:" class="formItem">{{info.netName}}</el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="收件人:" class="formItem">{{info.name}}</el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="业务员:" class="formItem">{{info.id}}</el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle">
                <el-col :span="6">
                  <el-form-item label="客户电话:" class="formItem">{{info.telephone}}</el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="客户手机:" class="formItem">{{info.phone}}</el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="收货地址:" class="formItem">{{info.address}}</el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle">
                <el-col :span="6">
                  <el-form-item label="物流单号:" class="formItem">{{info.postId}}</el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="支付账号:" class="formItem">{{payType[info.paymentType]}}</el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle">
                <!-- <el-col :span="24">
                  <el-form-item label="冻结原因:" class="formItem">{{info.id}}</el-form-item>
                </el-col>-->
              </el-row>
              <el-row type="flex" align="middle">
                <el-col :span="24">
                  <el-form-item label="买家留言:" class="formItem">{{info.buyerRemark}}</el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle">
                <el-col :span="24">
                  <el-form-item label="客服备注:" class="formItem">{{info.serviceRemark}}</el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="系统订单" name="warehousing">
            <el-table resizable border :data="tableData" style="width: 100%;padding:unset;" height="400" highlight-current-row>
              <el-table-column :show-overflow-tooltip="true" align="left" prop="id" label="原始订单号"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" align="left" prop="orderNo" label="订单号"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="store" label="店铺名称"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="orderStatus" label="订单状态"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="netName" label="客户网名"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="name" label="收件人"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="phone" label="手机"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="sellCount" label="货品总量（kg）"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="receivableMoney" label="总金额（元）"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="salesman" label="业务员"></el-table-column>
              <el-table-column :show-overflow-tooltip="true" prop="createDatetime" label="创建时间"></el-table-column>
              <div slot="empty">
                <v-nolist :text="'暂无数据'"></v-nolist>
              </div>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VNolist from "@/components/no-list";
export default {
  components: {
    VNolist
    // warehouseDetail
  },
  name: "prodocut-table",
  updatedForm: {
    type: Object,
    required: true
  },
  data() {
    return {
      activeName: "outgoing",
      currentWarehouse: "",
      warehouseDetaildialogVisible: false,
      loading: false,
      outgoingTable: [],
      tableData: [],
      pageinfo: {
        pageIndex: 1,
        pageSize: 10
      },
      currentPage: 1,
      totalItem: 0,
      // 选中行信息
      multipleSelection: [],
      // warehouseUuid: window.sessionStorage.getItem('WarehousUuid'),
      searchForm: {
        netName: ""
      },
      info: {},
      payType: {
        1: "担保交易",
        2: "银行收款",
        3: "现金收款",
        4: "货到付款",
        5: "欠款记应收",
        6: "客户预存款"
      }
    };
  },
  methods: {
    /* 获取分页功能的：每页几条数据 */
    handleSizeChange(val) {
      this.pageinfo.pageSize = val;
      this.getOutGoingTable();
    },
    /* 获取分页功能的：当前是第几页 */
    handleCurrentChange(val) {
      this.pageinfo.pageIndex = val;
      this.getOutGoingTable();
    },
    search() {
      this.pageinfo.pageIndex = 1;
      this.getOutGoingTable();
    },
    getOutGoingTable() {
      this.$http
        .post("/original/orderList", {
          ...this.pageinfo,
          ...this.searchForm
        })
        .then(res => {
          this.totalItem = res.data.total;
          this.outgoingTable = res.data.apiResult;
        });
    },
    getOriginalDetail() {
      this.$http
        .post("/original/orderDetail", {
          originalOrderNumber: this.currentWarehouse
        })
        .then(res => {
          this.info = res.data.apiResult;
          this.warehouseDetaildialogVisible = true;
        });
    },
    getRefOrderList() {
      this.$http
        .post("/original/refOrderList", {
          originalOrderNumber: this.currentWarehouse
        })
        .then(res => {
          this.tableData = res.data.apiResult;
        });
    },
    outgoingDetail(row, column, cell, event) {
      if (column.label === "原始订单号") {
        this.currentWarehouse = row.id;
        this.getOriginalDetail();
        this.getRefOrderList();
      }
    },
    cellStyle(row, column, rowIndex, columnIndex) {
      if (row.columnIndex === 1) {
        return "textDecoration: underline;color: #1d7fff;cursor: pointer;";
      }
      return "";
    },
    prevWarehouse() {
      console.log("prev");
    },
    nextWarehouse() {
      console.log("next");
    },
    createWarehouse() {
      this.orderTitle = "新建仓库";
      this.newWarehousedialogVisible = true;
    },
    getNewWarehousedialogVisible(msg) {
      this.newWarehousedialogVisible = msg;
    }
  },
  mounted() {
    this.getOutGoingTable();
  }
};
</script>
<style lang="scss">
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
.formItem {
  margin-bottom: 0px;
}
</style>