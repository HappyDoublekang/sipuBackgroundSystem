<template>
  <div>
    <el-form ref="form" :model="info" label-width="90px">
      <el-row type="flex" align="middle">
        <el-col>原始单号: a912345678945</el-col>
      </el-row>
      <br>
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <el-form-item label="店铺">
            <el-select v-model="info.region" placeholder="线下" style="width:100%;" size="medium">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发票类型">
            <el-select v-model="info.region" placeholder="普通发票" style="width:100%;" size="medium">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发票金额">
            <el-input v-model="info.name" style="width:100%;" size="medium" placeholder="输入金额" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="税务登记代码">
            <el-input v-model="info.name" style="width:100%;" size="medium" placeholder="输入代码" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <el-form-item label="单位名称">
            <el-input v-model="info.name" style="width:100%;" size="medium" placeholder="输入单位名称" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册地址">
            <el-input v-model="info.name" style="width:100%;" size="medium" placeholder="输入地址" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <el-form-item label="注册电话">
            <el-input v-model="info.name" style="width:100%;" size="medium" placeholder="输入电话" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开户银行">
            <el-input v-model="info.name" style="width:100%;" size="medium" placeholder="自动填充" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户账号">
            <el-input v-model="info.name" style="width:100%;" size="medium" placeholder="自动填充" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <el-form-item label="收票人手机">
            <el-input v-model="info.name" style="width:100%;" size="medium" placeholder="输入手机" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收票人姓名">
            <el-input v-model="info.name" style="width:100%;" size="medium" placeholder="输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收票人地址">
            <el-input v-model="info.name" style="width:100%;" size="medium" placeholder="输入地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="24">
          <el-form-item label="客服备注">
            <el-input v-model="info.name" style="width:100%;" size="medium" placeholder="请输入客服备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row type="flex" align="middle">
      <el-col :span="2" :offset="10" style="text-align:center;margin-right:15px;">
        <el-button style="width:100%">取消</el-button>
      </el-col>
      <el-col :span="2">
        <el-button style="width:100%">确定</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {}
    }
  }
}
</script>