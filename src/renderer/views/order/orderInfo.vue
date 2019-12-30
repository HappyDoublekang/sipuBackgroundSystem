<template>
  <div>
    <el-form ref="form" :model="info" label-width="90px">
      <el-row type="flex" align="middle">
        <el-col>基本信息</el-col>
      </el-row>
      <el-row type="flex" align="middle" v-if="infoType == 'new'">
        <el-col :span="6">
          <el-form-item label="业务员">
            <el-autocomplete
              style="width:100%;"
              v-model="info.salesman"
              :fetch-suggestions="querySearchAsyncSalesman"
              value-key="account"
              placeholder="请选择业务员"
            ></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单类型">
            <el-select v-model="info.region" placeholder="选择订单类型" style="width:100%;" size="medium">
              <el-option :label="item.label" :value="item.id" v-for="(item,key) of orderType" :key="key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="店铺">
            <el-autocomplete
              style="width:100%;"
              v-model="info.storeName"
              :fetch-suggestions="querySearchAsyncStoreId"
              value-key="storeName"
              placeholder="请选择店铺"
              @select="handleSelectStoreId"
            ></el-autocomplete>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle" v-else>
        <el-col :span="6">
          <el-form-item label="订单号">
            XBS123456789
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="原始单号">
            123456789123
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务员">
            天猫精灵
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="店铺">
            天猫一号店
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col>客户信息</el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <el-form-item label="客户姓名">
            <el-autocomplete
              style="width:100%;"
              v-model="info.name"
              :fetch-suggestions="querySearchAsyncNetName"
              value-key="realName"
              placeholder="请选择客户"
              @select="handleSelectRealName"
            ></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户网名">
            <el-input v-model="info.netName" style="width:100%;" size="medium" placeholder="自动填充" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别">
            <el-select v-model="info.sex" style="width:100%;">
              <el-option label="男" :value="0"></el-option>
              <el-option label="女" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
         <el-form-item label="客户手机">
            <el-input v-model="info.phone" style="width:100%;" size="medium" placeholder="自定填充" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <el-form-item label="固定电话">
            <el-input v-model="info.telephone" style="width:100%;" size="medium" placeholder="自动填充" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="省">
            <el-input v-model="info.province" style="width:100%;" size="medium" placeholder="浙江省 自动填充"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="市">
            <el-input v-model="info.city" style="width:100%;" size="medium" placeholder="杭州市 自动填充"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="县、区">
            <el-input v-model="info.county" style="width:100%;" size="medium" placeholder="西湖区 自动填充"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
         <el-col :span="12">
          <el-form-item label="地址">
            <el-input v-model="info.address" :disabled="true" style="width:100%;" size="medium" placeholder="上面的信息选完之后，自动填充"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱">
            <el-input v-model="info.email" style="width:100%;" size="medium" placeholder="杭州市 自动填充"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <el-form-item label="旺旺">
            <el-input v-model="info.wangWang" style="width:100%;" size="medium" placeholder="自动填充"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="买家留言">
            <el-input v-model="info.buyerRemark" style="width:100%;" size="medium" placeholder="自动填充"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="24">
          <el-form-item label="客服备注">
            <el-input v-model="info.serviceRemark" style="width:100%;" size="medium" placeholder="请输入客服备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col>结算信息</el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <el-form-item label="贷款总额">
            <el-input v-model="info.totalPayment" style="width:100%;" size="medium" placeholder="自动生成"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="运费">
            <el-input v-model="info.fare" style="width:100%;" size="medium" placeholder="手动输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
         <el-form-item label="优惠金额">
            <el-input v-model="info.forFreeAmount" style="width:100%;" size="medium" placeholder="手动输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="税额">
            <el-input v-model="info.tax" style="width:100%;" size="medium" placeholder="手动输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <el-form-item label="发票类型">
            <el-select v-model="info.invoiceType" placeholder="普通发票" style="width:100%;" size="medium">
              <el-option label="普通发票" :value="1"></el-option>
              <el-option label="普通增值税发票" :value="2"></el-option>
              <el-option label="专用增值税发票" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结算方式">
            <el-select v-model="info.payType" placeholder="银行卡" style="width:100%;" size="medium">
              <el-option label="银行卡" :value="1"></el-option>
              <el-option label="支付宝" :value="3"></el-option>
              <el-option label="微信" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票抬头">
            <el-input v-model="info.title" style="width:100%;" size="medium" placeholder="请输入发票抬头"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <el-form-item label="实收金额">
            <el-input v-model="info.trueAmount" style="width:100%;" size="medium" placeholder="手动输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row type="flex" align="middle">
      <el-col :span="2" :offset="10" style="text-align:center;margin-right:15px;">
        <el-button style="width:100%">取消</el-button>
      </el-col>
      <el-col :span="2">
        <el-button style="width:100%" @click="confime">确定</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['infoType'],
  data() {
    return {
      orderType: [
        {
          id: 0,
          label: '线上'
        },
        {
          id: 1,
          label: '刷单'
        },
        {
          id: 2,
          label: '套现'
        },
        {
          id: 3,
          label: '线下'
        },
        {
          id: 4,
          label: '换货'
        }
      ],
      info: {
        'address': '',
        'buyerRemark': '',
        'city': '',
        'country': '',
        'county': '',
        'email': '',
        'forFreeAmount': 0,
        'logisticsModeId': 0,
        'name': '',
        'netName': '',
        'originalOrderNo': '',
        'payAccount': '',
        'payType': '',
        'phone': '',
        'postAmount': 0,
        'postcode': '',
        'province': '',
        'qq': '',
        'salesman': '',
        'serviceRemark': '',
        'sex': '',
        'telephone': '',
        'totalAmount': 0,
        'trueAmount': 0,
        'wangWang': '',
        invoiceType: '',
        tax: '',
        title: '',
        totalPayment: 0,
        deliveryMethod: '',
        fare: 0,
        storeId: '',
        storeName: ''
      }
    }
  },
  watch: {
    'info.province': {
      handler: function(n, o) {
        this.info.address = n + this.info.city + this.info.country
      },
      deep: true
    },
    'info.city': {
      handler: function(n, o) {
        this.info.address = this.info.province + n + this.info.country
      },
      deep: true
    },
    'info.county': {
      handler: function(n, o) {
        this.info.address = this.info.province + this.info.city + n
      },
      deep: true
    }
  },
  methods: {
    confime() {
      this.$http.post('/advanceOrder/create', {
        ...this.info
      }).then(res => {
        this.$emit('confim')
      }).catch(err => {
        console.log(err)
      })
    },
    querySearchAsyncSalesman(queryString, cb) {
      this.$http.post('/user/list', {
        'account': queryString,
        'disable': 1,
        'pageIndex': 1,
        'pageSize': 10000,
        'userType': 1
      }).then(res => {
        cb(res.data.apiResult)
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
    querySearchAsyncNetName(queryString, cb) {
      this.$http.post('/customer/listCustomer', {
        'pageIndex': 1,
        'pageSize': 10000,
        'realName': queryString
      }).then(res => {
        cb(res.data.apiResult)
      })
    },
    handleSelectRealName(item) {
      this.info.netName = item.netName
      this.info.sex = item.sex
      this.info.phone = item.cellphone
      this.info.telephone = item.telephone
      this.info.province = item.province
      this.info.city = item.city
      this.info.county = item.county
      this.info.address = item.address
      this.info.wangWang = item.wangWang
      this.info.buyerRemark = item.remark
      this.info.email = item.netName
    },
    handleSelectStoreId(item) {
      this.info.storeId = item.id
    }
  }
}
</script>