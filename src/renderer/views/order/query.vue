<template>
  <div>
    <!-- <div class="mgb15">
            <el-button type="primary" @click="exportExcel"><i class="iconfont icon-daochu"></i>导出</el-button>
    </div>-->
    <div class="search-condition">
      <el-form inline ref="searchForm" :model="searchForm" label-width="80px" style="overflow: hidden;">
        <el-col>
          <el-form-item label="筛选条件:">
            <!-- <el-select class="w160" v-model="searchForm.brandId" placeholder="全部商店">
              <el-option v-for="item in brand_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select class="w160" v-model="searchForm.brandId" placeholder="全部订单">
              <el-option v-for="item in brand_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>-->
            <el-input class="w160" v-model="searchForm.orderNo" placeholder="订单编号"></el-input>
            <el-input class="w160" v-model="searchForm.orderStatus" placeholder="订单状态"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="搜索条件:">
            <el-input class="w160" v-model="searchForm.serviceRemark" placeholder="客服备注"></el-input>
            <el-input class="w160" v-model="searchForm.onlineName" placeholder="客户网名"></el-input>
            <el-input class="w160" v-model="searchForm.originalOrderNo" placeholder="原始订单号"></el-input>
            <el-select class="w160" v-model="searchForm.brandId" placeholder="卖家备注旗帜">
              <el-option label="红" :value="1"></el-option>
              <el-option label="黄" :value="2"></el-option>
              <el-option label="绿" :value="3"></el-option>
              <el-option label="蓝" :value="4"></el-option>
              <el-option label="紫" :value="5"></el-option>
            </el-select>
            <el-autocomplete class="w160" v-model="storeName" :fetch-suggestions="querySearchAsyncStoreId" value-key="storeName" placeholder="店铺" @select="handleSelectStoreId"></el-autocomplete>
            <el-button class="w100" type="primary" plain @click="search">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <el-row type="flex" align="middle" justify="start">
      <el-col :span="2">
        <el-button type="primary" size="mini">颜色备注</el-button>
      </el-col>
    </el-row>
    <br />
    <el-table resizable border :data="outgoingTable" ref="multipleTable" v-loading="loading" style="width: 100%;" height="605">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="left" prop="id" label="订单号"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="orderStatus" label="订单状态"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="storeName" label="店铺名称"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="customerNetName" label="客户网名"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="realName" label="收件人"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="cellphone" label="手机"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="goodsNumber" label="货品总量（kg）"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="actualMoney" label="总价（元）"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="actualMoney" label="实付金额（元）"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="receivableMoney" label="下单时间"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="payDatetime" label="付款时间"></el-table-column>
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
        :current-page.sync="pageInfo.pageIndex"
        :page-size="pageInfo.pageSize"
        :page-sizes="[10,15,20]"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import VNolist from "@/components/no-list";

export default {
  components: {
    VNolist
  },
  name: "prodocut-table",
  updatedForm: {
    type: Object,
    required: true
  },
  data() {
    return {
      loading: false,
      outgoingTable: [],
      total: 0,
      // 选中行信息
      multipleSelection: [],
      // warehouseUuid: window.sessionStorage.getItem('WarehousUuid'),
      searchForm: {
        isHistory: "",
        onlineName: "",
        orderNo: "",
        orderStatus: "",
        originalOrderNo: "",
        sellerFlag: "",
        serviceRemark: "",
        storeId: ""
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 20
      },
      storeName: ""
    };
  },
  methods: {
    /* 获取分页功能的：每页几条数据 */
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.getOrderList();
    },
    /* 获取分页功能的：当前是第几页 */
    handleCurrentChange(val) {
      this.pageInfo.pageIndex = val;
      this.getOrderList();
    },
    cellStyle(row, column, rowIndex, columnIndex) {
      if (row.columnIndex === 1) {
        return "textDecoration: underline;color: #1d7fff;cursor: pointer;";
      }
      return "";
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
      this.searchForm.storeId = item.id;
    },
    getOrderList() {
      this.$http
        .post("/order/list", { ...this.pageInfo, ...this.searchForm })
        .then(res => {
          this.outgoingTable = res.data.apiResult;
          this.total = res.data.total;
        });
    },
    search() {
      this.pageInfo.pageIndex = 1;
      this.getOrderList();
    }
  },
  mounted() {
    this.getOrderList();
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
</style>

