<template>
  <div>
    <el-row type="flex" align="middle" justify="start">
      <el-col :span="2">
        <el-button type="primary" size="mini">新建生产单</el-button>
      </el-col>
    </el-row>
    <br>
    <el-table :data="tableData" style="width: 100%;" height="400" highlight-current-row>
      <el-table-column prop="orderno" label="货品编码" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="status" label="货品名称" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="name" label="品牌" show-overflow-tooltip></el-table-column>
      <el-table-column prop="shou" label="分类" show-overflow-tooltip></el-table-column>
      <el-table-column prop="phone" label="规格" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="fail" label="生产备注" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="sumprice" label="数量" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="trueprice" label="生产数量" show-overflow-tooltip></el-table-column>
      <el-table-column
        label="操作">
        <template>
          <el-button type="text" style="text-align:left;">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
        }
      ]
    }
  }
}
</script>

