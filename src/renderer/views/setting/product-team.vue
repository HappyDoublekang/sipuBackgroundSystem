<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">设置</el-breadcrumb-item> -->
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>生产小组设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
      <el-form-item label="小组名称" prop="name">
        <el-input v-model="searchForm.name" placeholder="小组名称"></el-input>
      </el-form-item>
      <el-form-item label="负责人名称" prop="contactName">
        <el-input v-model="searchForm.contactName" placeholder="负责人名称"></el-input>
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
    <el-table :data="productList" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column prop="workShopName" label="车间库名称">
      </el-table-column>
      <el-table-column prop="name" label="小组名称">
      </el-table-column>
      <el-table-column prop="contactName" label="负责人名称">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式">
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
                    <el-form-item label="车间库">
                        <el-input v-model="addForm.workShopId"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="小组名称">
                        <el-input v-model="addForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="负责人名称">
                        <el-input v-model="addForm.contactName"></el-input>
                    </el-form-item> 
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系方式" prop="phone">
                        <el-input v-model="addForm.phone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
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
      formTitle: '新建生产小组',
      searchForm: {
        pageSize: '10',
        pageIndex: '1',
        contactName: '',
        name: '',
        // workShopName: ''
      },
      postData: {
        pageSize: '10',
        pageIndex: '1',
        contactName: '',
        name: '',
        // workShopName: ''
      },
      addForm: {
        workShopId: '',
        name: '',
        contactName: '',
        phone: ''
      },
      pagination: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      productList: [],
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
      console.log(val)
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
        this.$confirm('是否删除', '确定删除选中的小组？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let ids = this.multipleSelection.map(item => item.id)
            this.$http.post('workGroup/delete', {'ids': ids}).then(res => {
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
    // 获取小组列表
    queryList() {
      this.$http.post('workGroup/list', this.postData).then(res => {
        if (res.data.retCode === '000000') {
            this.productList = res.data.apiResult
            this.pagination.total = res.data.count
        }
      })
    },
    // 新建或者编辑
    handlePopupForm(formName) {
        this.formVisible = true
        if (formName === 'add') {
            this.formTitle = '新建生产小组'
            this.addForm = {}
        } else if (formName === 'edit') {
            this.formTitle = '编辑生产小组'
            if (this.multipleSelection.length === 1) {
                this.addForm = this.multipleSelection[0]
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
          let url = this.formTitle === '新建生产小组' ? 'workGroup/create' : 'workGroup/update'
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
        this.$tool.exportExcel(this, 'workGroup/exportOrders') // 后端没写导出
        // this.$message({
        //   message: '没有检测到导出接口',
        //   type: 'error'
        // })
    }
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
