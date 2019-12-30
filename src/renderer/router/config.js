export default {
  routes: [
    {
      path: '/',
      name: 'login',
			component: require('@/views/login').default
			// redirect: '/index'
    },
    {
      path: '/index',
      component: require('@/views/layout').default,
      children: [
				// ===============设置模块开始====================
		{
			path: '/device-account',
			name: 'device-account', // 外接设备账号设置
			component: require('@/views/setting/device-account').default
		},
		{
			path: '/strategy',
			name: 'strategy', // 策略设置
			component: require('@/views/setting/strategy').default
		},
		{
			path: '/employees-management',
			name: 'employees-management', // 员工管理
			component: require('@/views/setting/employees').default
		},
		{
			path: '/store',
			name: 'store', // 店铺设置
			component: require('@/views/setting/store').default
		},
		{
			path: '/warehouse',
			name: 'warehouse', // 仓库设置
			component: require('@/views/setting/warehouse').default
		},
		{
			path: '/product-team',
			name: 'product-team', // 生产小组设置
			component: require('@/views/setting/product-team').default
		},
		{
			path: '/global-setting',
			name: 'global-setting', // 全局设置
			component: require('@/views/setting/global-setting').default
		},
		{
			path: '/order-color-change',
			name: 'order-color-change', // 改颜色
			component: require('@/views/order/index').default
		},
				// ===============设置模块结束====================
        // 首页在设置模块里面
        {
          path: '/',
          name: 'homepage', // 首页
					component: require('@/views/setting/homepage').default
        },
        {
		      path: '/trade',
		      component: require('@/views/layout/trade').default,
		      children: [
		        // ================货品模块开始================
		        {
		          path: '/',
		          name: 'fittings-management', // 配件管理
		          component: require('@/views/goods/fittings').default
		        },
		        {
		          path: '/sawblade-management',
		          name: 'sawblade-management', // 锯条管理
		          component: require('@/views/goods/sawblade').default
		        },
		        {
		          path: '/fittings-management',
		          name: 'fittings-management', // 配件管理
		          component: require('@/views/goods/fittings').default
		        },
		        {
		          path: '/stock-management',
		          name: 'stock-management', // 原料管理
		          component: require('@/views/goods/stock').default
		        },
		        {
		          path: '/brandManage',
		          name: 'brandManage', // 品牌管理
		          component: require('@/views/goods/brands').default
		        },
		        {
		          path: '/category',
		          name: 'category', // 货品分类
		          component: require('@/views/goods/category').default
		        },
		        {
		          path: '/qrcode',
		          name: 'qrcode', // 二维码
		          component: require('@/views/goods/qrcode').default
		        },
		        {
		          path: '/pricelist',
		          name: 'pricelist', // 价格单
		          component: require('@/views/goods/priceList').default
		        },
		        // ================货品模块结束================
		        // ================订单模块开始================
		        {
		          path: '/order-management',
		          name: 'order-management', // 订单管理
		          component: require('@/views/order').default
		        },
		        {
		          path: '/order-advance',
		          name: 'order-advance', // 预订单管理
		          component: require('@/views/order/advance').default
		        },
		        {
		          path: '/order-produce',
		          name: 'order-produce', // 生产单管理
		          component: require('@/views/order/produce').default
		        },
		        {
		          path: '/order-invoice',
		          name: 'order-invoice', // 申请开票
		          component: require('@/views/order/invoice').default
		        },
		        {
		          path: '/order-query',
		          name: 'order-query', // 订单查询
		          component: require('@/views/order/query').default
				},
				{
		          path: '/order-original',
		          name: 'order-original', // 原始订单管理
		          component: require('@/views/order/original').default
				},
				{
		          path: '/order-original-change',
		          name: 'order-original-change', // 原始订单管理
		          component: require('@/views/order/newOriginal').default
				},
		        // ================订单模块结束================
		        // ==============发货模块开始==================
		        {
		          path: '/shipping-management',
		          name: 'shipping-management', // 发货管理
		          component: require('@/views/shipping/shipping-management').default
		        },
		        // {
		        //   path: '/afterale-shipping',
		        //   name: 'afterale-shipping', // 售后发货
		        //   component: require('@/views/shipping/aftersale').default
		        // },
						// ==============发货模块结束==================
						// ==============售后模块开始==================
						{
		          path: '/returnOrder-management',
		          name: 'returnOrder-management', // 退货单管理
		          component: require('@/views/aftersale/returnOrder-management').default
						},
						{
		          path: '/repairOrder-management',
		          name: 'repairOrder-management', // 维修单管理
		          component: require('@/views/aftersale/repairOrder-management').default
						},
						{
		          path: '/reissueGood-management',
		          name: 'reissueGood-management', // 补发货物管理
		          component: require('@/views/aftersale/reissueGood-management').default
						},
						{
		          path: '/feedback-management',
		          name: 'feedback-management', // 反馈管理
		          component: require('@/views/aftersale/feedback-management').default
						},
						{
		          path: '/accountability-management',
		          name: 'accountability-management', // 追责管理
		          component: require('@/views/aftersale/accountability-management').default
						},
						{
		          path: '/rebate-management',
		          name: 'rebate-management', // 反款管理
		          component: require('@/views/aftersale/rebate-management').default
		        },
						// ==============售后模块结束==================
						// 新的采购
						{
		          path: '/procurementApply-management',
		          name: 'procurementApply-management', // 采购申请管理
		          component: require('@/views/procurement/procurementApply-management').default
						},
						{
		          path: '/procurementOrder-management',
		          name: 'procurementOrder-management', // 采购单管理
		          component: require('@/views/procurement/procurementOrder-management').default
		        },
						// end
		        // ==============采购模块开始==================
		        {
		          path: '/procurement-management',
		          name: 'procurement-management', // 采购单管理
		          component: require('@/views/procurement').default
		        },
		        {
		          path: '/procurement-audit',
		          name: 'procurement-audit', // 采购审核
		          component: require('@/views/procurement/audit').default
		        },
		        {
		          path: '/suppliers-management',
		          name: 'suppliers-management', // 供应商管理
		          component: require('@/views/procurement/suppliers').default
		        },
		        {
		          path: '/suppliers-goods',
		          name: 'suppliers-goods', // 供应商货品
		          component: require('@/views/procurement/suppliers/goods').default
		        },
		        // ==============采购模块结束==================
		        // ==============仓库模块开始==================
		        {
		          path: '/stock-management',
		          name: 'stock-management', // 库存管理
		          component: require('@/views/storehouse/stock').default
		        },
		        {
		          path: '/product-order-management',
		          name: 'product-order-management', // 生产单管理
		          component: require('@/views/storehouse/product').default
						},
						{
		          path: '/outgoing-management',
		          name: 'outgoing-management', // 出库管理
		          component: require('@/views/storehouse/outgoing').default
						},
						{
		          path: '/warehousing-management',
		          name: 'warehousing-management', // 入库管理
		          component: require('@/views/storehouse/warehousing').default
						},
						{
		          path: '/inventory-management',
		          name: 'inventory-management', // 库存管理
		          component: require('@/views/storehouse/inventory').default
						},
						{
		          path: '/bulk-purchase-warehousing',
		          name: 'bulk-purchase-warehousing', // 批量采购入库
		          component: require('@/views/storehouse/bulk').default
		        },
		        // ==============仓库模块结束==================
		        // ===============CRM模块开始==================
		        {
		          path: '/customer-files',
		          name: 'customer-files', // 客户档案
		          component: require('@/views/crm/customer-files').default
		        },
		        {
		          path: '/member-management',
		          name: 'member-management', // 会员管理
		          component: require('@/views/crm/member').default
		        },
		        // ===============CRM模块结束==================
		        // ===============统计模块开始=================
		        {
		          path: '/maintenance-statistics',
		          name: 'maintenance-statistics', // 维修统计
		          component: require('@/views/statistics/maintenance').default
		        },
		        {
		          path: '/procurement-statistics',
		          name: 'procurement-statistics', // 采购统计
		          component: require('@/views/statistics/procurement').default
		        },
		        {
		          path: '/order-statistics',
		          name: 'order-statistics', // 订单统计
		          component: require('@/views/statistics/order').default
		        },
		        {
		          path: '/stock-statistics',
		          name: 'stock-statistics', // 库存统计
		          component: require('@/views/statistics/stock').default
		        },
		        {
		          path: '/performance-statistics',
		          name: 'performance-statistics', // 业绩统计
		          component: require('@/views/statistics/performance').default
		        },
		        {
		          path: '/goods-sold-statistics',
		          name: 'goods-sold-statistics', // 货品售卖统计
		          component: require('@/views/statistics/goods-sold').default
		        },
		        {
		          path: '/workshop-statistics',
		          name: 'workshop-statistics', // 车间统计
		          component: require('@/views/statistics/workshop').default
		        },
		        {
		          path: '/finance-statistics',
		          name: 'finance-statistics', // 财务统计
		          component: require('@/views/statistics/finance').default
		        },
		        {
		          path: '/after-statistics',
		          name: 'after-statistics', // 售后统计
		          component: require('@/views/statistics/aftersale').default
		        },
		        // ===============统计模块结束=================
		        {
		          path: '/aftersale-management',
		          name: 'aftersale-management',
		          component: require('@/views/aftersale/aftersale-parts').default
		        },
		        {
		          path: '/unknown-things',
		          name: 'unknown-things', // 无名件
		          component: require('@/views/aftersale/unknown-things').default
		        },
		        {
		          path: '/returns-management',
		          name: 'returns-management', // 退货管理
		          component: require('@/views/aftersale/returns-management').default
		        },
		        // ===============财务模块开始=================
		        {
		          path: '/after-receivable',
		          name: 'after-receivable', // 售后应收管理
		          component: require('@/views/finance/after-receivable').default
		        },
		        {
		          path: '/workshop-audit',
		          name: 'workshop-audit', // 车间工作量审核
		          component: require('@/views/finance/workshop-audit').default
		        },
		        {
		          path: '/receivables-management',
		          name: 'receivables-management', // 应收管理
		          component: require('@/views/finance/receivables-management').default
		        },
		        {
		          path: '/financial-audit',
		          name: 'financial-audit', // 财务审核
		          component: require('@/views/finance/financial-audit').default
		        },
		        {
		          path: '/copewith-management',
		          name: 'copewith-management', // 应付管理
		          component: require('@/views/finance/copewith-management').default
		        },
		        {
		          path: '/invoice-management',
		          name: 'invoice-management', // 发票管理
		          component: require('@/views/finance/invoice-management').default
		        }
		        // ===============财务模块结束=================
		      ]
		    },
		    {
		      path: '/data', // 财务
		      component: require('@/views/layout/data').default,
		      children: [
		      	{
		          path: '/bill-management',
		          name: 'bill-management', // 账单管理
		          component: require('@/views/finance/bill-management').default
						},
						{
		          path: '/order-audit',
		          name: 'order-audit', // 订单审核
		          component: require('@/views/finance/order-audit').default
						},
						{
		          path: '/invoices-management',
		          name: 'invoices-management', // 发票管理
		          component: require('@/views/finance/invoices-management').default
						},
						{
		          path: '/purchase-audit',
		          name: 'purchase-audit', // 采购审核
		          component: require('@/views/finance/purchase-audit').default
						},
						{
		          path: '/customer-management',
		          name: 'customer-management', // 采购审核
		          component: require('@/views/crm/customer-management').default
		        }
		      ]
		    }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
}
