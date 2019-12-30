<template>
  <div>
    <el-card class="box-card">
      <el-row type="flex" align="middle">
        <el-col :span="2">筛选条件:</el-col>
        <el-col :span="3">
          <el-select placeholder="省" style="width:100%;" v-model="searchForm.province" @change="changeProvince" clearable @clear="clearProvince">
            <el-option
              v-for="(item,index) of provinceData"
              :key="index"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-select placeholder="市" style="width:100%;" v-model="searchForm.city" @change="changeCity" clearable @clear="clearCity">
            <el-option
              v-for="(item,index) of cityData"
              :key="index"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-select placeholder="县/镇" style="width:100%;" v-model="searchForm.county" clearable>
            <el-option
                v-for="(item,index) in countyData"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
          </el-select>
        </el-col>
      </el-row>
      <br>
      <el-row type="flex" align="middle">
        <el-col :span="2">搜索条件:</el-col>
        <el-col :span="3">
          <el-input type="text" placeholder="客户姓名" style="width:100%;" v-model="searchForm.realName"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input type="text" placeholder="客户电话" style="width:100%;" v-model="searchForm.mobileNo"></el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" plain @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <br>
    <el-table :data="tableData" style="width: 100%;" height="605" highlight-current-row @cell-click="orderDetail" :cell-style="cellStyle">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="realName" label="客户姓名" show-overflow-tooltip width="130"></el-table-column>
      <el-table-column prop="netName" label="客户网名" show-overflow-tooltip width="120"></el-table-column>
      <el-table-column prop="country" label="国家" show-overflow-tooltip></el-table-column>
      <el-table-column prop="province" label="省份" show-overflow-tooltip width="110"></el-table-column>
      <el-table-column prop="city" label="城市" show-overflow-tooltip width="110"></el-table-column>
      <el-table-column prop="county" label="区县" show-overflow-tooltip width="240"></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip width="130"></el-table-column>
      <el-table-column prop="wangWang" label="平台账号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="telephone" label="固定电话" show-overflow-tooltip width="130"></el-table-column>
      <el-table-column prop="cellphone" label="手机" show-overflow-tooltip></el-table-column>
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
      :visible.sync="invoicesInfoDialogVisible"
      title="发票信息"
      width="70%">
      <invoicesInfo :customerId="customerId"></invoicesInfo>
    </el-dialog>
  </div>
</template>
<script>
import invoicesInfo from './invoices-info.vue'
import {cityData} from '../../components/china_regions.js'
export default {
  components: {
    invoicesInfo
  },
  data() {
    return {
      invoicesInfoDialogVisible: false,
      total: 0,
      customerId: -1,
      searchForm: {
        city: '',
        county: '',
        customerId: '',
        mobileNo: '',
        pageIndex: 1,
        pageSize: 20,
        province: '',
        realName: ''
      },
      tableData: [],
      currentPage: 1,
      provinceData: [],
      cityData: [],
      countyData: []
    }
  },
  mounted() {
    this.provinceData = cityData
    this.search()
  },
  methods: {
    search() {
      this.$http.post('/customer/listCustomer', {
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
      if (column.label === '客户姓名') {
        this.customerId = row.id
        this.invoicesInfoDialogVisible = true
      }
    },
    cellStyle (row, column, rowIndex, columnIndex) {
      if (row.columnIndex === 1) {
        return 'textDecoration: underline;color: #1d7fff;cursor: pointer;'
      }
      return ''
    },
    changeProvince(name) {
      this.cityData = []
      this.countyData = []
      this.searchForm.city = ''
      this.searchForm.county = ''
      for (let item of cityData) {
        if (item.name === name) {
          this.cityData = item.city
        }
      }
    },
    changeCity(name) {
      this.countyData = []
      this.searchForm.county = ''
      for (let item of this.cityData) {
        if (item.name === name) {
          this.countyData = item.area
        }
      }
    },
    clearProvince() {
      this.cityData = []
      this.countyData = []
      this.searchForm.city = ''
      this.searchForm.county = ''
    },
    clearCity() {
      this.countyData = []
      this.searchForm.county = ''
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
