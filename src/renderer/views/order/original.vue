<template>
	<div class="order-management">
		<div class="mgb15">
			<el-dropdown @command="commandOrderStatus" class="mgl10">
				<el-button type="primary">
					{{filter.orderStatus.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-for="item in orderStatus" :key="item.value.status" :command="item.value">{{item.label}}</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-dropdown @command="handleCommand">
				<el-button type="primary">
					{{filter.store}}<i class="el-icon-caret-bottom el-icon--right"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-for="item in commands" :key="item.id" :command="item.storeName">{{item.storeName}}</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-input  style="width: 150px;" v-model="filter.originalOrderNumber" label="平台单号" placeholder="平台单号"></el-input>
			<el-input  style="width: 150px;" v-model="filter.netName" label="客户网名" placeholder="客户网名"></el-input>
			<el-button type="primary" @click="research" class="mgl10" icon="search">搜索</el-button>
			<el-button type="primary" @click="resetFilter" class="mgl10" icon="edit">重置</el-button>
			<el-button type="primary" @click="exportExcel"><i class="iconfont icon-daochu"></i>导出</el-button>
		</div>
		<div class="table-wrapper">
			<el-table :data="orderList" border fit v-loading="loading" ref="orderList" style="width: 100%" highlight-current-row @current-change="selected" @selection-change="handleSelectionChange" max-height="523" :row-style="setRowStyle">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column type="index" label="序号" width="70" align="center">
				</el-table-column>
				<el-table-column prop="id" label="平台单号" align="center" min-width="180">
				</el-table-column>
				<el-table-column prop="store" label="店铺" align="center" min-width="160">
				</el-table-column>
				<el-table-column :formatter="$formatter.formatSystemStatus" label="订单状态" align="center" min-width="100">
				</el-table-column>
				<el-table-column prop="netName" label="客户网名" align="center" min-width="100">
				</el-table-column>
				<el-table-column prop="name" label="收件人" align="center" width="100">
				</el-table-column>
				<el-table-column prop="logisticsName" label="物流" align="center">
				</el-table-column>
				<el-table-column prop="sellCount" label="货品数量" align="center" width="100">
				</el-table-column>
				<el-table-column prop="orderDatetime" label="下单时间" :formatter="$formatter.formatTime('orderDatetime')" align="center" min-width="160">
				</el-table-column>
				<el-table-column prop="payDatetime" label="付款时间" :formatter="$formatter.formatTime('payDatetime')" align="center" min-width="160">
				</el-table-column>
				<el-table-column prop="receivableMoney" label="实付金额" align="center" width="100">
				</el-table-column>
			</el-table>
		</div>
		<div class="toolbar clearfix">
			<el-pagination class="fr" layout="total, sizes, prev, pager, next" :page-size="pagination.pageSize" :total="pagination.total" :current-page="pagination.pageIndex"  @size-change="handleSizeChange" @current-change="handleCurrentChange">
			</el-pagination>
		</div>
		<!-- 底部辅助表格 -->
		<auxiliary-table type="orderOrignal"></auxiliary-table>
	</div>
</template>
<script>
	import AuxiliaryTable from '@/views/order/original/AuxiliaryTable'
	import mixin from '@/mixins'
	
	export default {
	  name: 'order-original',
	  components: {
	    [AuxiliaryTable.name]: AuxiliaryTable
	  },
	  data() {
	    return {
	      // 定时标志
	      _self: this,
	      fontColorData: [],
	      goodsList: [],
	      loglist: [],
	      warehouseList: [],
	      supplierList: [],
	      brand_options: [],
	      orderStatus: [{
	        value: {
	          status: '',
	          name: '全部状态'
	        },
	        label: '全部状态'
	      }, {
	        value: {
	          status: '0',
	          name: '待递交'
	        },
	        label: '待递交'
	      }, {
	        value: {
	          status: '1',
	          name: '已递交'
	        },
	        label: '已递交'
	      }, {
	        value: {
	          status: '2',
	          name: '部分发货'
	        },
	        label: '部分发货'
	      }, {
	        value: {
	          status: '3',
	          name: '已发货'
	        },
	        label: '已发货'
	      }, {
	        value: {
	          status: '4',
	          name: '部分结算'
	        },
	        label: '部分结算'
	      }, {
	        value: {
	          status: '5',
	          name: '已完成'
	        },
	        label: '已完成'
	      }, {
	        value: {
	          status: '6',
	          name: '已取消'
	        },
	        label: '已取消'
	      }],
	      filter: {
	        store: '全部商店',
	        orderStatus: {
	          status: '-1',
	          name: '全部状态'
	        },
	        originalOrderNumber: '',
	        netName: ''
	      },
	      /* ===========对话框状态开始 =============== */
	      /* ===========对话框状态结束 =============== */
	      loading: false,
	      multipleSelection: [],
	      orderList: [],
	      pagination: {
	        pageIndex: 1,
	        pageSize: 20,
	        total: 0
	      },
	      order: {},
	      current: {},
	      commands: [],
	      productionOrderInfo: [],
	      // 新增字体颜色
	      initFontColor: {
	        name: '',
	        background_color: '#ffffff',
	        font_color: '#1f2d3d',
	        italic: 'normal',
	        bold: 'normal',
	        disable: '1',
	        editable: true,
	        disable_flag: false
	      }
	    }
	  },
	  mixins: [mixin],
	  watch: {},
	  methods: {
	    // 设置表格每一行的样式
	    setRowStyle(row, index) {
	      return 'background-color:' + row.backgroundColor + ';color:' + row.fontColor + ';font-weight:' + row.bold + ';font-style:' + row.italic
	    },
	    // 导出Excel
	    exportExcel() {
	      this.$tool.exportExcel(this, 'export/OrderExcelport')
	    },
	    // 多选
	    handleSelectionChange(val) {
	      this.multipleSelection = val
	    },
	    // 页面条数修改
	    handleSizeChange(val) {
	    	this.pagination.pageSize = val
	      	this._loadMainList()
	    },
	    // 分页查询
	    handleCurrentChange(val) {
	      this.pagination.pageIndex = val
	      this._loadMainList()
	    },

	    // 选择店铺
	    handleCommand(command) {
	      this.filter.store = command
	      this._loadMainList()
	    },
	    // 选择系统状态
	    commandOrderStatus(command) {
	      this.filter.orderStatus = command
	      this._loadMainList()
	    },
	    // 单选
	    selected(current) {
	      this.current = current
	      this.$store.commit('selected', current)
	    },
	    // 搜索
	    research() {
	      this._loadMainList()
	    },
	    resetFilter() {
	    	this.filter.store = '全部商店'
	      	this.filter.orderStatus = {
	        	status: '-1',
	        	name: '全部状态'
	      	}
	      	this.filter.originalOrderNumber = ''
	      	this.filter.netName = ''
	      	this._loadMainList()
	    },
	    // 查询主列表
	    _loadMainList() {
	      this.$tool.loadList(this, 'original/orderList', bodyInfo => {
	        this.orderList = bodyInfo.info
	      }, {
	        'store': this.filter.store === '全部商店' ? '' : this.filter.store,
	        'systemStatus': this.filter.orderStatus.status === '-1' ? '' : this.filter.orderStatus.status,
	        'originalOrderNo': this.filter.originalOrderNumber,
	        'netName': this.filter.netName
	      })
	    },
	    // 查询商店
	    queryShop() {
	      this.$tool.loadOptions(this, 'store/list', bodyInfo => {
	        this.commands = bodyInfo.apiResult
        	this.commands.unshift({ storeName: '全部商店', id: 0 })
	      })
	    }
	  },
	  mounted() {
	    [this.queryShop, this._loadMainList].forEach(f => f())
	  },
	  destroyed() {
	    this.$store.commit('selected', {})
	  }
	}
</script>
<style lang="scss">
	.split-row {
		margin-top: 20px;
	}
	
	.color-panel {
		width: 960px;
	}
	
	.el-table {
		.el-input--mini .el-input__inner {
			text-align: center;
		}
		.el-form-item {
			margin-bottom: 0;
		}
	}
	
	.el-color-picker__trigger {
		border: none !important;
	}
	
	.order-management {
		.more-btn {
			margin-left: 15px;
			vertical-align: bottom;
		}
		.cancel-reason {
			width: 420px;
		}
		.cancel-footer {
			margin-top: 60px;
		}
	}
	
	.order-row {
		text-align: center;
		margin-top: 60px;
		.el-button+.el-button {
			margin-left: 20px;
		}
	}
	
	.el-icon-caret-bottom.readonly:before {
		content: ''
	}
</style>