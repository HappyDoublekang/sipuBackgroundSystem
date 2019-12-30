<template>
  <div>
    <el-table :data="tableData" style="width: 100%;" height="400" highlight-current-row>
      <el-table-column prop="title" label="发票抬头" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="taxNo" label="税号" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="bankAccount" label="公司名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="registerAddress" label="地址" show-overflow-tooltip></el-table-column>
      <el-table-column prop="invoiceType" label="发票类型" show-overflow-tooltip :formatter="invoiceType"></el-table-column>
      <el-table-column prop="phone" label="电话" show-overflow-tooltip ></el-table-column>
      <el-table-column
        label="操作"
        width="220">
        <template>
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="info.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      background
      layout="total, sizes, ->, prev, pager, next, jumper"
      :page-size="info.pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { mixin } from '../../mixins/index'
export default {
  mixins: [mixin],
  props: {
    customerId: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      tableData: [],
      total: 0,
      info: {
        'city': '',
        'county': '',
        'mobileNo': '',
        'province': '',
        'realName': '',
        'customerId': '',
        'pageIndex': 1,
        'pageSize': 20
      }
    }
  },
  mounted() {
    this.info.customerId = this.customerId.toString()
    this.$http.post('/customer/listCustomerInvoice', {
      ...this.info
    }).then(res => {
      let data = res.data
      this.tableData = data.apiResult
      this.total = data.total
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    handleSizeChange () {},
    handleCurrentChange () {}
  }
}
</script>