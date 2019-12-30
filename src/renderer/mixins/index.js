import { invoiceType, status } from '@/components/enum.js'
export const mixin = {
  methods: {
    queryBrands () {
      this.$http.post('brand/list', {
        'body': {
          'pageIndex': 1,
          'pageSize': 10000,
          'disable': 1
        }
      }).then(res => {
        this.brand_options = res.data.body.info.map(item => ({label: item.brandName, value: item.id}))
      })
    },
    querySuppliers () {
      this.$http.post('supplier/list', {
        'body': {
          'pageIndex': 1,
          'pageSize': 10000
        }
      }).then(res => {
        this.supplier_options = res.data.body.info.map(item => ({label: item.name, value: item.id}))
      })
    },
    queryCategorys () {
      this.$http.post('category/list', {
        'body': {
          'pageIndex': 1,
          'pageSize': 10000
        }
      }).then(res => {
        this.category_options = res.data.body.info.map(item => ({label: item.categoryName, value: item.id}))
      })
    },
    // 发票类型  表格使用
    invoiceType(row, column, cellValue, index) {
      if (invoiceType[cellValue]) return invoiceType[cellValue]
      else return ''
    },
    // 状态   表格使用
    status(row, column, cellValue, index) {
      if (status[cellValue]) return status[cellValue]
      else return ''
    }
  }
}
