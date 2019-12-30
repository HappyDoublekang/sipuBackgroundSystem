<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">设置</el-breadcrumb-item> -->
      <el-breadcrumb-item>设置</el-breadcrumb-item>
      <el-breadcrumb-item>全局设置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="managementOperation">
      <el-button type="success" @click="handlePopupForm('add')" :disabled="multipleSelection.length > 0"><i class="iconfont  "></i>添加</el-button>
      <el-button type="success" @click="handlePopupForm('edit')" :disabled="multipleSelection.length !== 1"><i class="iconfont icon-icon07"></i>修改</el-button>
      <el-button type="danger" icon="delete2" @click="handleDelete" :disabled="multipleSelection.length == 0">删除</el-button>
    </div>
    <el-table :data="productList" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column prop="key" label="名称文案">
      </el-table-column>
      <el-table-column prop="value" label="值">
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
              <el-col :span="24">
                    <el-form-item label="文案名称">
                        <el-input v-model="addForm.key"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="值">
                        <el-input v-model="addForm.value"></el-input>
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
  name: 'global-setting',
  data() {
    return {
      formTitle: '添加全局管理',
      postData: {
        pageSize: '10',
        pageIndex: '1',
        key: ''
      },
      addForm: {
        key: '',
        value: ''
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
        this.$confirm('是否删除', '确定删除选中的设置？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let keys = this.multipleSelection.map(item => item.key)
            this.$http.post('globalConfiguration/delete', {'keys': keys}).then(res => {
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
      this.$http.post('globalConfiguration/list', this.postData).then(res => {
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
            this.formTitle = '添加全局管理'
            this.addForm = {}
        } else if (formName === 'edit') {
            this.formTitle = '编辑全局管理'
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
          let url = this.formTitle === '添加全局管理' ? 'globalConfiguration/create' : 'globalConfiguration/update'
          this.$http.post(url, this.addForm).then(res => {
            this.handleClose()
            this.queryList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
