<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="出库" name="outgoing">
        <outgoing></outgoing>
      </el-tab-pane>
      <el-tab-pane label="入库" name="warehousing">
        <warehousing></warehousing>
      </el-tab-pane>
      <el-tab-pane label="盘点" name="check">
        <check></check>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import outgoing from './outgoing.vue'
import warehousing from './warehousing.vue'
import check from './check.vue'
export default {
  components: {
    outgoing,
    warehousing,
    check
  },
  data () {
    return {
      activeName: 'outgoing'
    }
  }
}
</script>

