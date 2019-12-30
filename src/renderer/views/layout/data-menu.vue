<!--顶部导航栏-->
<template>
	<el-aside width="190px" style="background: #FFFFFF;box-shadow: 0 1px 5px 0 rgba(0,0,0,0.10);">
	  <el-menu theme="dark" :default-active="activeIndex" router @select="handleSelect" :default-openeds="['1']" style="border:none">
	    <el-submenu index="1" v-if="$store.getters.hasPermission('goodsRead')">
	      <template slot="title"><i class="el-icon-tickets"></i>财务</template>
	      <el-menu-item index="bill-management" data-title="财务">账单管理</el-menu-item>
	      <el-menu-item index="order-audit" data-title="财务">订单审核</el-menu-item>
	      <el-menu-item index="invoices-management" data-title="财务">发票管理</el-menu-item>
	      <el-menu-item index="purchase-audit" data-title="财务">采购审核</el-menu-item>
	    </el-submenu>
	    <el-submenu index="2" v-if="$store.getters.hasPermission('orderManageRead')">
	      <template slot="title"><i class="el-icon-document-add"></i>CRM</template>
        <el-menu-item index="customer-management" data-title="CRM">客户管理</el-menu-item>
	    </el-submenu>
	    <el-submenu index="3" v-if="$store.getters.hasPermission('deliverRead')">
	      <template slot="title"><i class="el-icon-message"></i>统计</template>
	    </el-submenu>
	  </el-menu>
  </el-aside>
</template>
<script>
  export default {
    name: 'data-menu',
    data() {
      return {
        activeIndex: 'fittings-management'
      }
    },
    methods: {
      // 导航改变处理事件
      handleSelect(key, keyPath, item) {
        if (item) {
          let tabItem1 = {
            name: item.$el.getAttribute('data-title'),
            level: 2
          }
          this.$store.commit('updateMenuLevel', tabItem1)
          let tabItem2 = {
            name: item.$el.textContent,
            level: 3
          }
          this.$store.commit('updateMenuLevel', tabItem2)
        } else {
          let tabItem1 = {
            name: '财务',
            level: 2
          }
          this.$store.commit('updateMenuLevel', tabItem1)
          let tabItem2 = {
            name: '账单管理',
            level: 3
          }
          this.$store.commit('updateMenuLevel', tabItem2)
        }
      }
    },
    mounted() {
      this.handleSelect()
    },
  }
</script>

<style lang="scss">
.el-menu--horizontal .el-submenu {
  .el-submenu__title.login-information {
    border-bottom: none;
    margin-right: 70px;
    .item {
      margin-right: 100px;
    }
  }
  &:hover .el-submenu__title.login-information {
    border-bottom: none; 
  }
}
</style>