<template>
  <div>
    <el-form ref="form" :model="info" label-width="90px">
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <el-form-item label="订单编号:" class="formItem">
            XBS123456789
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="原始单号:" class="formItem">
            123456789123
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单状态:" class="formItem">
            处理中
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="退款状态:" class="formItem">
            退款中
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <el-form-item label="店铺名称:" class="formItem">
            天猫一号店
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="货品总量:" class="formItem">
            34444444
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="货品种类数:" class="formItem">
            18
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="总价:" class="formItem">
            1233333333元
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <el-form-item label="总价:" class="formItem">
            1233333333元
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="下单时间:" class="formItem">
            2018.11.13 16:27:18
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="付款时间:" class="formItem">
            2018.11.13 16:27:18
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发货时间:" class="formItem">
            2018.11.13 16:27:18
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <el-form-item label="客户网名:" class="formItem">
            帅的雅痞
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户姓名:" class="formItem">
            yiF
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收件人:" class="formItem">
            然宝
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务员:" class="formItem">
            张大喵
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      info: {}
    }
  }
}
</script>
<style lang="scss" scoped>
.formItem {
  margin-bottom: 0px;
}
</style>
