<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">设置</el-breadcrumb-item> -->
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>店铺设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="addForm" :rules="rules" class="demo-form-inline" ref="form">
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="addForm.name" placeholder="店铺名称"></el-input>
      </el-form-item>
      <el-form-item label="店铺类型" prop="platform">
        <el-input v-model="addForm.platform" placeholder="店铺类型"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd"><i class="iconfont  "></i>添加</el-button>
        <el-button type="danger" @click="handleDelete" icon="delete2" :disabled="multipleSelection.length !== 1">删除</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="managementOperation">
      <el-button type="success" @click="handlePopupForm('add')"><i class="iconfont  "></i>新建</el-button>
      <el-button type="success" @click="handlePopupForm('edit')" :disabled="multipleSelection.length !== 1"><i class="iconfont icon-icon07"></i>编辑</el-button>
      <el-button type="danger" icon="delete2" @click="handleDelete">删除</el-button>
      <el-button type="primary" @click="exportExcel"><i class="iconfont icon-daochu"></i>导出</el-button>
    </div> -->
    <el-table :data="ShopList" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column prop="storeName" label="店铺名称" align="center">
      </el-table-column>
      <el-table-column prop="platform" label="店铺类型" align="center">
      </el-table-column>
      <el-table-column label="创建时间" :formatter="formmatCreateDatetime" align="center">
      </el-table-column>
      <el-table-column label="修改时间" :formatter="formmatUpdateDatetime" align="center">
      </el-table-column>
    </el-table>
    <div class="toolbar clearfix">
      <el-pagination class="fr"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pagination.pageSize"
        :page-sizes="[10,15,20]"
        :total="pagination.total"
        :current-page="pagination.pageIndex"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <!-- <el-dialog custom-class="add-brand-Form box-shadow" :title="formTitle" :modal="false" :visible.sync="formVisible" size="tiny" :before-close="handleClose">
      <el-form ref="form" :model="addForm" :rules="rules" label-width="80px">
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺类型">
          <el-input v-model="addForm.platform"></el-input>
        </el-form-item>
        <el-form-item label="是否停用">
          <el-checkbox :true-label="trueLabel" :false-label="falseLabel" v-model="addForm.disable"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleClose" size="medium" style="margin-left:90px;">取 消</el-button>
          <el-button type="primary" @click="handleSubmitForm('form')" size="medium" style="margin-left:33px;">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>
<script>
export default {
  name: 'store-setting',
  data() {
    return {
      // trueLabel: 2,
      // falseLabel: 1,
      // formTitle: '新建店铺',
      addForm: {
        name: '',
        platform: ''
        // disable: '1'
      },
      pagination: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      ShopList: [],
      multipleSelection: [],
      rules: {
        name: [{ required: true, message: '请填写店铺名称', trigger: 'blur' }],
        platform: [{ required: true, message: '请填写店铺类型', trigger: 'blur' }]
      },
      formVisible: false
    }
  },
  methods: {
    // 过滤器，过滤日期
    formmatCreateDatetime(row, column) {
      return this.$moment(new Date(row.createDatetime)).format('YYYY-MM-DD hh:mm:ss')
    },
    // 如果有日期，过滤，如果没有，显示---
    formmatUpdateDatetime(row, column) {
      if (row.updateDatetime) {
        return this.$moment(new Date(row.updateDatetime)).format('YYYY-MM-DD hh:mm:ss')
      }
      return '---'
    },
    // 分页
    handleCurrentChange(val) {
      this.pagination.pageIndex = val
      this.queryList()
    },
    /* 获取分页功能的：每页几条数据 */
    handleSizeChange(val) {
      console.log(val)
      this.pagination.pageSize = val
      this.queryList()
    },
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 添加商店
    handleAdd() {
    	this.$refs['form'].validate(valid => {
	        if (valid) {
				    this.$http.post('store/create', this.addForm).then(res => {
			        this.addForm = {
			          'name': '',
			          'platform': ''
			        }
			        this.queryList()
			      })
	      	}
	    })
    },
    // 删除选中商店
    handleDelete() {
      console.log(this.multipleSelection)
      let shopIds = this.multipleSelection[0].id
      this.$http.post('store/delete', {
        'storeId': shopIds
      }).then(res => {
        this.queryList()
      })
    },
    // 获取商店列表
    queryList() {
      this.$http.post('store/list', {
        ...this.pagination
      }).then(res => {
        this.ShopList = res.data.apiResult
        this.pagination.total = res.data.count
      })
    }
    // 新建或者编辑
    // handlePopupForm(formName) {
    //   // if (formName === 'add') {
    //   //   this.formTitle = '新建店铺'
    //   // } else if (formName === 'edit') {
    //   //   if (this.multipleSelection.length === 1) {
    //   //     this.form.name = this.multipleSelection[0].name
    //   //     this.form.shortName = this.multipleSelection[0].shortName
    //   //     this.form.disable = this.multipleSelection[0].disable
    //   //     this.form.brandId = this.multipleSelection[0].id
    //   //   }
    //   //   this.formTitle = '编辑店铺'
    //   // }
    //   this.formVisible = true
    // },
    // 关闭并清空
    // handleClose() {
    //   this.formVisible = false
    //   this.$refs['form'].resetFields()
    //   this.addForm = {
    //   	name: '',
    //     platform: '',
    //     disable: '1'
    //   }
    // },
    // 根据不同formTitle 向不同url提交数据
    // handleSubmitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       let url = this.formTitle === '新建店铺' ? 'store/create' : 'store/update'
    //       this.$http.post(url, this.addForm).then(res => {
    //         this.handleClose()
    //         this.queryList()
    //       })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
  },
  mounted() {
    this.queryList()
  }
}

</script>

<style lang="scss">
  .managementOperation {
    margin-bottom: 15px;
  }
</style>
