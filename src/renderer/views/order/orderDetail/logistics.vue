<template>
  <div>
    <el-steps direction="vertical" :active="1">
      <el-step title="运输中" icon="el-icon-truck" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="运输中" icon="el-icon-location" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="运输中" icon="el-icon-location" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="已揽件" icon="el-icon-truck" description="顺丰速运 已收取快件"></el-step>
      <el-step title="已发货" icon="el-icon-s-order" description="卖家发货"></el-step>
    </el-steps>
  </div>
</template>
<script>
export default {
}
</script>

