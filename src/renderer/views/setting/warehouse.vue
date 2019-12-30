<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">设置</el-breadcrumb-item> -->
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>仓库设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
      <el-form-item label="仓库名称" prop="warehouseName">
        <el-input v-model="searchForm.warehouseName" placeholder="仓库名称"></el-input>
      </el-form-item>
      <el-form-item label="仓库类型" prop="category">
        <el-input v-model="searchForm.category" placeholder="仓库类型"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search('searchForm')">搜索</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="managementOperation">
      <el-button type="success" @click="handlePopupForm('add')" :disabled="multipleSelection.length > 0"><i class="iconfont  "></i>新建</el-button>
      <el-button type="success" @click="handlePopupForm('edit')" :disabled="multipleSelection.length !== 1"><i class="iconfont icon-icon07"></i>编辑</el-button>
      <el-button type="danger" icon="delete2" @click="handleDelete" :disabled="multipleSelection.length == 0">删除</el-button>
      <el-button type="primary" @click="exportExcel"><i class="iconfont icon-daochu"></i>导出</el-button>
    </div>
    <el-table :data="warehouseList" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column prop="warehouseName" label="仓库名称">
      </el-table-column>
      <el-table-column prop="category" label="仓库类型">
      </el-table-column>
      <el-table-column prop="id" label="仓库编号">
      </el-table-column>
      <el-table-column prop="address" label="地址">
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
    <el-dialog custom-class="add-brand-Form box-shadow" :title="formTitle" :visible.sync="formVisible">
        <el-form :model="addForm" ref="addForm" label-width="80px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="仓库名称" prop="warehouseName">
                        <el-input v-model="addForm.warehouseName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="仓库编号" prop="id">
                        <el-input v-model="addForm.warehouseNo"></el-input>
                    </el-form-item> 
                </el-col>
                <el-col :span="8">
                    <el-form-item label="仓库类型" prop="category">
                        <el-input v-model="addForm.category"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        <el-form-item label="仓库地址" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;margin-left: -100px;">
          <el-button @click="handleClose('addForm')">取 消</el-button>
          <el-button type="primary" @click="handleSubmitForm('addForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'store-setting',
  data() {
    return {
      // trueLabel: 2,
      // falseLabel: 1,
      formTitle: '新建仓库',
      searchForm: {
        pageSize: '10',
        pageIndex: '1',
        category: '',
        warehouseName: ''
      },
      postData: {
        pageSize: '10',
        pageIndex: '1',
        category: '',
        warehouseName: ''
      },
      addForm: {
        warehouseNo: '',
        address: '',
        category: '',
        warehouseName: ''
      },
      pagination: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      warehouseList: [],
      multipleSelection: [],
      formVisible: false
    }
  },
  methods: {
    /** 搜索 */
    search(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.postData = this.searchForm
                this.queryList()
            } else {
                console.log('error search!!')
                return false
            }
        })
    },
    /* 重置 */
    resetForm(formName) {
        this.$refs[formName].resetFields()
        this.queryList()
    },
    // 分页
    handleCurrentChange(val) {
      this.postData.pageIndex = val
      this.queryList()
    },
    /* 获取分页功能的：每页几条数据 */
    handleSizeChange(val) {
      this.postData.pageSize = val
      this.queryList()
    },
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 删除选中
    handleDelete() {
        console.log(this.multipleSelection)
        this.$confirm('是否删除', '确定删除选中的仓库？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let ids = this.multipleSelection.map(item => item.id)
            this.$http.post('warehouse/delete', {'ids': ids}).then(res => {
                if (res.data.retCode === '000000') {
                    this.queryList()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            })
        })
    },
    // 获取仓库列表
    queryList() {
      this.$http.post('warehouse/list', this.postData).then(res => {
        if (res.data.retCode === '000000') {
            this.warehouseList = res.data.apiResult
            this.pagination.total = res.data.count
        }
      })
    },
    // 新建或者编辑
    handlePopupForm(formName) {
        this.formVisible = true
        if (formName === 'add') {
            this.formTitle = '新建仓库'
            this.addForm = {}
        } else if (formName === 'edit') {
            this.formTitle = '编辑仓库'
            if (this.multipleSelection.length === 1) {
                this.addForm = this.multipleSelection[0]
                this.addForm.warehouseNo = this.multipleSelection[0].id
            }
        }
    },
    // 关闭并清空
    handleClose(formName) {
        // this.$refs[formName].resetFields()
        this.formVisible = false
    },
    // 根据不同formTitle 向不同url提交数据
    handleSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = this.formTitle === '新建仓库' ? 'warehouse/create' : 'warehouse/update'
          this.$http.post(url, this.addForm).then(res => {
            this.handleClose()
            this.queryList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 导出excel
    exportExcel() {
        this.$tool.exportExcel(this, 'warehouse/exportOrders')
    },
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
