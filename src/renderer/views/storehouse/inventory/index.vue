<template>
    <div>
        <div class="mgb15">
            <el-button type="primary" @click="exportExcel"><i class="iconfont icon-daochu"></i>导出</el-button>
        </div>
        <div class="search-condition">
            <el-form inline :model="searchForm" ref="searchForm" label-width="80px" style="overflow: hidden;">
                <el-col>
                    <el-form-item label="筛选条件:" prop="goodsId">
                        <el-input class="w160" v-model="searchForm.goodsId" placeholder="货品编码"></el-input>
                    </el-form-item>
                    <el-form-item prop="brandId">
                        <el-select class="w160" v-model="searchForm.brandId" placeholder="品牌">
                            <el-option v-for="item in brand_options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="id">
                        <el-input class="w160" v-model="searchForm.id" placeholder="货品OR原料"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="w100" type="primary" plain  @click="search('searchForm')">搜索</el-button>
                        <el-button class="w100" type="primary" plain @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </div>
        <!-- <el-row type="flex" align="middle" justify="start">
            <el-col :span="2">
                <el-button type="primary" size="mini" @click="createWarehouse">调拨</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" size="mini" >盘点</el-button>
            </el-col>
        </el-row> -->
        <br>
        <el-table resizable border :data="inventoryTable" ref="multipleTable" v-loading="loading" style="width: 100%;" height="605" @cell-click="outgoingDetail" :cell-style="cellStyle">
            <!-- <el-table-column type="selection" width="55" :selectable='unChecked'></el-table-column> -->
            <el-table-column :show-overflow-tooltip="true" prop="goodsId" label="货品编码"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="brandName" label="货品品牌"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="name" label="货品名称"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="specification" label="规格"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="length" label="长度（CM）"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="type" label="分类"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="avaCount" label="库存"></el-table-column>
            <el-table-column prop="operation" label="操作">
                <template slot-scope="scope">
                    <div style="cursor:pointer;color:#32A5E9;margin-right:15px;display:inline-block;"
                        size="small"
                        @click="allocate(scope.row.id)">
                        调拨
                    </div>
                    <div style="cursor:pointer;color:#32A5E9;margin-right:15px;display:inline-block;"
                        size="small"
                        @click="inventory(scope.row.id)">
                        盘点
                    </div>
                </template>
            </el-table-column>
            <div slot="empty"><v-nolist :text="'暂无数据'"></v-nolist></div>
        </el-table>
        <div class="toolbar clearfix">
            <el-pagination 
                class="fr"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                :page-sizes="[10,15,20]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="totalItem">
            </el-pagination>
        </div>
        <el-dialog
            :title="warehouseTitle"
            :visible.sync="newWarehousedialogVisible"
            width="50%">
            <warehouseInfo @newWarehousedialogVisible='getNewWarehousedialogVisible'></warehouseInfo>
        </el-dialog>
        <el-dialog
            :visible.sync="warehouseDetaildialogVisible"
            width="70%">
            <div slot="title">
                <div class="content btn" @click="prevWarehouse">
                <i class="el-icon-arrow-left"></i>
                </div>
                <div class="content">
                货品编号：{{currentWarehouse}}
                </div>
                <div class="content btn" @click="nextWarehouse">
                <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <warehouseDetail></warehouseDetail>
        </el-dialog>
        <!-- 调拨盘点弹窗 -->
        <el-dialog custom-class="add-brand-Form box-shadow" :title="formTitle" :modal="false" :visible.sync="formVisible" size="tiny" :before-close="handleClose">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="盘点数量" prop="avaCount" v-if="formTitle == '盘点'">
                    <el-input v-model="form.avaCount"></el-input>
                </el-form-item>
                <el-form-item label="调拨数量" prop="allocateNum" v-if="formTitle == '调拨'">
                    <el-input v-model="form.allocateNum"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleClose" size="medium" style="margin-left:90px;">取 消</el-button>
                    <el-button type="primary" @click="handleSubmitForm('form')" size="medium" style="margin-left:33px;">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
  </div>
</template>

<script>
    import VNolist from '@/components/no-list'
    import warehouseDetail from '../warehouseComponents/warehouseDetail/warehouseDetail'
    import warehouseInfo from '../warehouseComponents/creatWarehouse/warehouseInfo'

    export default {
        components: {
            VNolist,
            warehouseDetail,
            warehouseInfo
        },
        name: 'prodocut-table',
        updatedForm: {
            type: Object,
            required: true
        },
        data() {
            // 自定义表单验证
            let validateAllocateNum = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入数量'))
                } else {
                    callback()
                }
            }
            return {
                postData: {
                    pageSize: '10',
                    pageIndex: '1',
                    goodsId: '',
                    brandId: '',
                    id: ''
                },
                searchForm: {
                    pageSize: '10',
                    pageIndex: '1',
                    goodsId: '',
                    brandId: '',
                    id: ''
                },
                form: {
                    allocateNum: '',
                    avaCount: ''
                },
                formTitle: '盘点',
                formVisible: false,
                warehouseTitle: '新建仓库',
                currentWarehouse: '',
                newWarehousedialogVisible: false,
                warehouseDetaildialogVisible: false,
                loading: false,
                inventoryTable: [],
                brand_options: [],
                pageSize: 10,
                currentPage: 1,
                totalItem: 0,
                // 选中行信息
                multipleSelection: {
                    id: []
                },
                rules: {
                    allocateNum: [
                        {required: true, validator: validateAllocateNum, trigger: 'blur'}
                    ],
                    avaCount: [
                        {required: true, validator: validateAllocateNum, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            /* 获取分页功能的：每页几条数据 */
            handleSizeChange(val) {
                this.postData.pageSize = val
                this.getInventoryTable()
            },
            /* 获取分页功能的：当前是第几页 */
            handleCurrentChange(val) {
                this.postData.pageIndex = val
                this.getInventoryTable()
            },
            /** 搜索 */
            search(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.postData = this.searchForm
                        this.getInventoryTable()
                    } else {
                        console.log('error search!!')
                        return false
                    }
                })
            },
            /* 重置 */
            resetForm(formName) {
                this.$refs[formName].resetFields()
                this.getInventoryTable()
            },
            getInventoryTable() {
                this.$http.post('stock/list', this.postData).then(res => {
                    if (res.data.retCode === '000000') {
                        this.inventoryTable = res.data.apiResult
                        this.totalItem = res.data.count
                    }
                })
            },
            // 获取品牌下拉框数据
            queryBrands() {
                this.$tool.common(this, 'brand/list', {
                    'pageIndex': 1,
                    'pageSize': 10000
                }, bodyInfo => {
                    this.brand_options = bodyInfo.apiResult
                })
            },
            // 导出excel
            exportExcel() {
                this.$tool.exportExcel(this, 'stock/exportOrders')
            },
            // 状态禁选
            // unChecked(row) {
            //     if (row.status === 90) {
            //         return false
            //     } else if (row.status === 1) {
            //         return true
            //     }
            // },
            handleClose() {
                this.formVisible = false
            },
            inventory() {
                this.formVisible = true
                this.formTitle = '盘点'
            },
            allocate() {
                this.formVisible = true
                this.formTitle = '调拨'
            },
            /* 提交 */
            handleSubmitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('stock/inventory', this.form).then(res => {
                            if (res.data.retCode === '000000') {
                                this.inventoryTable = res.data.apiResult
                                this.totalItem = res.data.count
                            }
                        })
                    } else {
                        console.log('error search!!')
                        return false
                    }
                })
            },
            outgoingDetail (row, column, cell, event) {
                console.log(row, column, cell, event)
                if (column.label === '货品编码') {
                    this.currentWarehouse = row.goodsId
                    this.warehouseDetaildialogVisible = true
                }
            },
            cellStyle (row, column, rowIndex, columnIndex) {
                if (row.columnIndex === 0) {
                    return 'textDecoration: underline;color: #1d7fff;cursor: pointer;'
                }
                return ''
            },
            prevWarehouse () {
                console.log('prev')
            },
            nextWarehouse () {
                console.log('next')
            },
            createWarehouse () {
                this.orderTitle = '新建仓库'
                this.newWarehousedialogVisible = true
            },
            getNewWarehousedialogVisible (msg) {
                this.newWarehousedialogVisible = msg
            }
        },
        mounted () {
            this.getInventoryTable()
            this.queryBrands()
        }
    }
</script>
<style lang="scss">
    .content {
        display: inline-block;
    }
    .btn {
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border: 1px solid gainsboro;
        cursor: pointer;
    }
    .mgb15{
        position: absolute;
        top: 70px;
        right: 50px;
    }
    .el-table--border td{
        border-right: 0px;
    }
    .el-table--border th{
        border-right: 1px solid #ebeef5;
    }
    .el-table th {
        background-color: #f5f7fa;
    }
    .add-brand-Form {
        width: 600px;
        .el-form {
            width: 540px;
            .el-form-item {
                    margin-bottom: 16px;
                }
        }
        .el-dialog__body {
            padding-bottom: 0;
        }
    }
</style>