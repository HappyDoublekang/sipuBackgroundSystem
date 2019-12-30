<template>
  <div>
    <el-row type="flex" align="middle">
      <el-col :span="2">
        <el-button style="width:100%;" @click="changeView('query')">查询</el-button>
      </el-col>
      <el-col :span="2">
        <el-button style="width:100%;" @click="changeView('newOrder')">新建</el-button>
      </el-col>
    </el-row>
    <br>
    <div v-if="viewType == 'query'">
      <el-card class="box-card">
        <el-row type="flex" align="middle">
          <el-col :span="2">筛选条件:</el-col>
          <el-col :span="4">
            <el-select placeholder="全部店铺"></el-select>
          </el-col>
        </el-row>
        <br>
        <el-row type="flex" align="middle">
          <el-col :span="2">订单状态:</el-col>
          <el-col :span="3">
            <el-radio>退货单待审核</el-radio>
          </el-col>
          <el-col :span="3">
            <el-radio>待收货</el-radio>
          </el-col>
          <el-col :span="3">
            <el-radio>退货入库待审核</el-radio>
          </el-col>
          <el-col :span="3">
            <el-radio>被取消</el-radio>
          </el-col>
          <el-col :span="3">
            <el-radio>递交失败</el-radio>
          </el-col>
          <el-col :span="3">
            <el-radio>递交中</el-radio>
          </el-col>
        </el-row>
        <br>
        <el-row type="flex" align="middle">
          <el-col :span="3" :offset="2">
            <el-radio>接单失败</el-radio>
          </el-col>
          <el-col :span="3">
            <el-radio>已接单</el-radio>
          </el-col>
          <el-col :span="3">
            <el-radio>部分入库</el-radio>
          </el-col>
          <el-col :span="3">
            <el-radio>待接单</el-radio>
          </el-col>
          <el-col :span="3">
            <el-radio>已完成</el-radio>
          </el-col>
        </el-row>
        <br>
        <el-row type="flex" align="middle">
          <el-col :span="2">时间:</el-col>
          <el-col :span="3">
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
        </el-row>
        <br>
        <el-row type="flex" align="middle">
          <el-col :span="2">搜索条件:</el-col>
          <el-col :span="3">
            <el-input placeholder="订单编号"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-input placeholder="退货单号"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-input placeholder="客户网名"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-input placeholder="客户姓名"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-input placeholder="退货物流单号"></el-input>
          </el-col>
        </el-row>
        <br>
        <el-row type="flex" align="middle">
          <el-col :span="3" :offset="2">
            <el-input placeholder="退换货原因"></el-input>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-button type="primary" plain>搜索</el-button>
          </el-col>
        </el-row>
      </el-card>
      <br>
      <el-table :data="tableData" style="width: 100%;" height="605" highlight-current-row @cell-click="orderDetail" :cell-style="cellStyle">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="orderno" label="订单号" show-overflow-tooltip width="130"></el-table-column>
        <el-table-column prop="status" label="店铺名称" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="name" label="订单状态" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shou" label="发件人" show-overflow-tooltip width="110"></el-table-column>
        <el-table-column prop="phone" label="收件人" show-overflow-tooltip width="110"></el-table-column>
        <el-table-column prop="fail" label="电话号码" show-overflow-tooltip width="240"></el-table-column>
        <el-table-column prop="sumprice" label="物流" show-overflow-tooltip width="130"></el-table-column>
        <el-table-column prop="trueprice" label="物流单号" show-overflow-tooltip width="130"></el-table-column>
        <el-table-column prop="orderdate" label="收件地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="paydate" label="下单时间" show-overflow-tooltip></el-table-column>
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
    </div>
    <div v-else>
      <el-card class="box-card">
        <br>
        <el-row type="flex" align="middle">
          <el-col :span="4">
            维修信息
          </el-col>
        </el-row>
        <br>
        <br>
        <el-row>
          <el-col :span="24">
            <el-form ref="form" :model="form" label-width="85px" label-position="left">
              <el-row type="flex" align="middle">
                <el-col :span="6">
                  <el-form-item label="取件方式" style="width:95%;">
                    <el-select></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="所在店铺" style="width:95%;">
                    <el-select></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="保修类型" style="width:95%;">
                    <el-select></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="购买时间" style="width:95%;">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
        <br>
        <br>
        <el-row type="flex" align="middle">
          <el-col :span="4">
            客户信息
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="24">
            <el-card>
              <el-form ref="form" :model="form" label-width="85px" label-position="left">
                <el-row type="flex" align="middle">
                  <el-col :span="6">
                    <el-form-item label="客户网名" style="width:95%;">
                      自动填充
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="客户姓名" style="width:95%;">
                      自动填充
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="联系电话" style="width:95%;">
                      自动填充
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="物流单号" style="width:95%;">
                      自动填充
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" align="middle">
                  <el-col :span="6">
                    <el-form-item label="省" style="width:95%;">
                      自动填充
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="市" style="width:95%;">
                      自动填充
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="县/区" style="width:95%;">
                      自动填充
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" align="middle">
                  <el-col :span="6">
                    <el-form-item label="退换货原因" style="width:95%;">
                      <el-select></el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="其他原因" style="width:95%;">
                      <el-input></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" align="middle">
                  <el-col :span="12">
                    <el-form-item label="地址" style="width:97%;">
                      <el-input placeholder="默认地址，可以手动修改"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注" style="width:95%;">
                      <el-input></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
        <br>
        <br>
        <el-row type="flex" align="middle">
          <el-col :span="4">
            货品信息
          </el-col>
        </el-row>
        <br>
        <el-button>添加</el-button>
        <br>
        <el-row type="flex" align="middle">
          <el-col :span="24">
            <el-table :data="tableData" style="width: 100%;" highlight-current-row >
              <el-table-column prop="orderno" label="货品编码" show-overflow-tooltip></el-table-column>
              <el-table-column prop="status" label="货品名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="name" label="品牌" show-overflow-tooltip></el-table-column>
              <el-table-column prop="shou" label="成功维修数量" show-overflow-tooltip></el-table-column>
              <el-table-column prop="phone" label="报废数量" show-overflow-tooltip></el-table-column>
              <el-table-column prop="fail" label="问题描述" show-overflow-tooltip></el-table-column>
              <el-table-column prop="trueprice" label="金额（元）" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作">
                <template>
                  <el-button type="text" style="text-align:left;">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <br>
        <br>
        <el-row type="flex" align="middle">
          <el-col :span="4">
            结算信息
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="24">
            <el-card>
              <el-form ref="form" :model="form" label-width="85px" label-position="left">
                <el-row type="flex" align="middle">
                  <el-col :span="6">
                    <el-form-item label="维修金额" style="width:95%;">
                      <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="收款方式" style="width:95%;">
                      <el-select></el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" align="middle">
                  <el-col :span="6">
                    <el-form-item label="支付方式" style="width:95%;">
                      <el-select></el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="发票类型" style="width:95%;">
                      <el-select></el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发票抬头" style="width:95%;">
                      <el-input></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" align="middle">
                  <el-col :span="6">
                    <el-form-item label="货运方式" style="width:95%;">
                      <el-select></el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
        <br>
        <br>
        <el-row type="flex" align="middle">
          <el-col :span="12">
            <el-button>取消</el-button>
          </el-col>
          <el-col :span="12">
            <el-button>确定</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-dialog
      title="录入单号"
      :visible.sync="enterOrderNoDialogVisible"
      width="35%">
      <el-row type="flex" align="middle">
        <el-col :span="3" :offset="9">
          物流单号
        </el-col>
        <el-col :span="5">
          <el-input></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="enterOrderNoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterOrderNoDialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog
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
      <el-tabs v-model="activeName">
        <el-tab-pane label="货品信息" name="goodInfo">
           <el-table :data="tableData" style="width: 100%;" height="605" highlight-current-row>
            <el-table-column prop="orderno" label="货品编码" show-overflow-tooltip width="130"></el-table-column>
            <el-table-column prop="status" label="货品名称" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column prop="name" label="品牌" show-overflow-tooltip></el-table-column>
            <el-table-column prop="shou" label="分类" show-overflow-tooltip width="110"></el-table-column>
            <el-table-column prop="phone" label="规则" show-overflow-tooltip width="110"></el-table-column>
            <el-table-column prop="fail" label="数量" show-overflow-tooltip width="240"></el-table-column>
            <el-table-column prop="sumprice" label="单价（元）" show-overflow-tooltip width="130"></el-table-column>
            <el-table-column prop="trueprice" label="金额（元）" show-overflow-tooltip width="130"></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="text" style="text-align:left;">入库</el-button>
                <el-button type="text" style="text-align:left;">报废</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      viewType: 'newOrder',
      enterOrderNoDialogVisible: false,
      orderDetaildialogVisible: false,
      currentOrder: '',
      activeName: 'goodInfo',
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
      ],
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange () {},
    handleCurrentChange () {},
    enterOrderNo () {
      this.enterOrderNoDialogVisible = true
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
    changeView (type) {
      this.viewType = type
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
.formSpan {
  font-size: 14px;
  padding: 6px 7px;
}
.spanBox {
  border: 1px solid gainsboro;
}
</style>
