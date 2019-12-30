<template>
  <div>
    <el-form ref="form" :model="info" label-width="90px" :label-position="labelPosition">
      <el-row type="flex" align="middle">
        <el-col :span="8">
          <el-form-item label="出库单号">
            <el-input v-model="info.id" style="width:100%;" size="medium" placeholder="请输入出库单号" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="货品编码">
            <el-input v-model="info.goodsId" style="width:100%;" size="medium" placeholder="请输入货品编码" ></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="仓库类型">
            <el-select v-model="info.region" placeholder="请输入仓库编号" style="width:100%;" size="medium">
              <el-option label="原料仓库" value="1"></el-option>
              <el-option label="啥子仓库" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="货品品牌">
            <el-input v-model="info.brandId" style="width:100%;" size="medium" placeholder="请输入货品品牌" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="8">
          <el-form-item label="货品名称">
            <el-input v-model="info.name" style="width:100%;" size="medium" placeholder="请输入货品名称" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="规格">
            <el-select v-model="info.specification" placeholder="请选择规格" style="width:100%;" size="medium">
              <el-option label="规格一" value="1"></el-option>
              <el-option label="规格二" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="长度（CM）">
            <el-input v-model="info.length" style="width:100%;" size="medium" placeholder="请输入长度（CM）" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="8">
          <el-form-item label="分类">
            <el-select v-model="info.categoryId" placeholder="请选择分类" style="width:100%;" size="medium">
              <el-option label="分类一" value="1"></el-option>
              <el-option label="分类二" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="可用库存">
            <el-input v-model="info.avaCount" style="width:100%;" size="medium" placeholder="请输入可用库存" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总库存">
            <el-input v-model="info.count" style="width:100%;" size="medium" placeholder="请输入总库存" ></el-input>
          </el-form-item>
        </el-col>
      </el-row> 
    </el-form>
    <el-row type="flex" align="middle">
      <el-col :span="3" :offset="9" style="text-align: center; margin-right: 15px;">
        <el-button style="width:100%" @click="closeNewWarehouse">取消</el-button>
      </el-col>
      <el-col :span="3">
        <el-button style="width:100%" type="primary" @click="confirmNewWarehouse">确定</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newWarehousedialogVisible: '',
      labelPosition: 'right',
      info: {
      }
    }
  },
  methods: {
      closeNewWarehouse () {
          this.newWarehousedialogVisible = false
          this.$emit('newWarehousedialogVisible', this.newWarehousedialogVisible)
      },
      confirmNewWarehouse () {
          this.newWarehousedialogVisible = false
          this.$emit('newWarehousedialogVisible', this.newWarehousedialogVisible)
          this.$emit('newWarehouseFormData', this.info)
      }
  }
}
</script>