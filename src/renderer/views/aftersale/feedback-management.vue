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
          <el-col :span="4">
            <el-select placeholder="事务类型"></el-select>
          </el-col>
          <el-col :span="4">
            <el-select placeholder="紧急"></el-select>
          </el-col>
          <el-col :span="4">
            <el-select placeholder="处理中"></el-select>
          </el-col>
        </el-row>
        <br>
        <el-row type="flex" align="middle">
          <el-col :span="2">责任人:</el-col>
          <el-col :span="4">
            <el-select></el-select>
          </el-col>
          <el-col :span="4">
            <div style="text-align:right;padding-right:5px;">创建人:</div>
          </el-col>
          <el-col :span="4">
            <el-select></el-select>
          </el-col>
        </el-row>
        <br>
        <el-row type="flex" align="middle">
          <el-col :span="2">登记时间:</el-col>
          <el-col :span="6">
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="2">
            <div style="text-align:right;padding-right:5px;">审核时间:</div>
          </el-col>
          <el-col :span="6">
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
            <el-input placeholder="客户名称"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-input placeholder="寄件人"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-input placeholder="货品名称"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
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
          反馈类型
          <el-col :span="4">
            <el-select style="margin-left:5px;"></el-select>
          </el-col>
        </el-row>
        <br>
        <br>
        <el-row type="flex" align="middle">
          <el-col :span="4">
            原始订单信息
          </el-col>
        </el-row>
        <br>
        <br>
        <el-row type="flex" align="middle">
          <el-col :span="4">
            <span class="formSpan">关联订单：</span>
            <span class="formSpan spanBox">XBS23123456789</span>
          </el-col>
          <el-col :span="4">
            <span class="formSpan">客户信息（旺旺）：</span>
            <span class="formSpan">XBS23123456789</span>
          </el-col>
          <el-col :span="4">
            <el-button>确认</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle">
          <el-col :span="24">
            <el-table :data="tableData" style="width: 100%;" highlight-current-row >
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
                  <el-button type="text" style="text-align:left;">添加</el-button>
                </template>
              </el-table-column>
            </el-table>
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
              <el-form ref="form" :model="form" label-width="85px">
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
                  <el-col :span="6" :offset="6">
                    <el-form-item label="其他原因" style="width:95%;">
                      <el-input></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" align="middle">
                  <el-col :span="24">
                    <el-form-item label="反馈内容" style="width:95%;">
                      <el-input type="textarea"></el-input>
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
