<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="订单详情" name="detail">
        <detail></detail>
      </el-tab-pane>
      <el-tab-pane label="物流跟踪" name="logistics">
        <logistics></logistics>
      </el-tab-pane>
      <el-tab-pane label="生产详情" name="produce">
        <produce></produce>
      </el-tab-pane>
      <el-tab-pane label="货品列表" name="goods">
        <goods></goods>
      </el-tab-pane>
      <el-tab-pane label="便签" name="note">
        <note></note>
      </el-tab-pane>
      <el-tab-pane label="日志" name="log">
        <log></log>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import detail from './orderDetail/detail.vue'
import logistics from './orderDetail//logistics.vue'
import produce from './orderDetail/produce.vue'
import goods from './orderDetail/goods.vue'
import note from './orderDetail/note.vue'
import log from './orderDetail/log.vue'
export default {
  components: {
    detail,
    logistics,
    produce,
    goods,
    note,
    log
  },
  data () {
    return {
      activeName: 'detail'
    }
  }
}
</script>

