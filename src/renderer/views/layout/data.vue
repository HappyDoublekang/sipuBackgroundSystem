<template>
  <el-container>
	  <!--顶部导航栏-->
    <data-menu class="header m15" style="border-bottom: 1px solid #FFD0D0D0;height:100vh;"></data-menu>
	  <el-container style="margin-left: 16px;padding-top: 0;">
	    <!--动态增减标签页-->
	    <el-header style="height: 50px;margin-bottom: 18px;background-color: #fff;margin-right: -20px!important;">
	    	<router-tabs></router-tabs>
	    </el-header>
    	<!--页面内容-->
	    <el-main>
	    	<router-view></router-view>
	    </el-main>
	    <!--全局对话框-->
	    <el-footer>
	    	<dialog-mangement></dialog-mangement>
	    </el-footer>
	  </el-container>
	</el-container>    
</template>
<script>
import DataMenu from './data-menu'
import RouterTabs from './router-tabs'
import Dialog from './dialog'

export default {
  name: 'Index',
  components: {
    [DataMenu.name]: DataMenu,
    [RouterTabs.name]: RouterTabs,
    [Dialog.name]: Dialog
  }
}
</script>
