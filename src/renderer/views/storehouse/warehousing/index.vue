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
                        <el-input class="w160" v-model="searchForm.id" placeholder="入库单号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="w100" type="primary" plain  @click="search('searchForm')">搜索</el-button>
                        <el-button class="w100" type="primary" plain @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </div>
        <el-row type="flex" align="middle" justify="start">
            <!-- <el-col :span="2">
                <el-button type="primary" size="mini" @click="createWarehouse">新建</el-button>
            </el-col> -->
            <el-col :span="2">
                <el-button type="primary" size="mini"  @click="storageConfim()">入库确认</el-button>
            </el-col>
        </el-row>
        <br>
        <el-table resizable border :data="warehousingTable" ref="multipleTable" v-loading="loading"  @selection-change="handleSelectionChange" style="width: 100%;" height="605" @cell-click="outgoingDetail" :cell-style="cellStyle">
            <el-table-column type="selection" width="55" :selectable='unChecked'></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="goodsId" label="货品编码"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="id" label="入库单号"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="reqNo" label="采购信息"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="brandName" label="货品品牌"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="name" label="货品名称"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="specification" label="规格"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="length" label="长度（CM）"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="count" label="数量"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="type" label="分类"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="status" label="处理状态" :formatter='status'></el-table-column>
            <!-- <el-table-column :show-overflow-tooltip="true" prop="avaCount" label="可用库存"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="count" label="锁定库存"></el-table-column> -->
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
        <!-- 详情弹窗 -->
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
            <div>
                <el-tabs>
                    <el-tab-pane label="入库">
                        <el-form ref="form" label-width="90px">
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="入库单号:" class="formItem">
                                        {{warehousingDetails.id || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="外部单号:" class="formItem">
                                        {{warehousingDetails.reqNo || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="入库类型:" class="formItem">
                                        {{warehousingDetails.type || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="货品编号:" class="formItem">
                                        {{warehousingDetails.goodsId || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="数量:" class="formItem">
                                        {{warehousingDetails.count || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="金额:" class="formItem">
                                        {{warehousingDetails.amount || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="状态:" class="formItem">
                                        {{warehousingDetails.status || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="工艺要求:" class="formItem">
                                        {{warehousingDetails.gongYi || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="创建时间:" class="formItem">
                                        {{warehousingDetails.createDatetime || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="修改时间:" class="formItem">
                                        {{warehousingDetails.updateDatetime || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="货品名称:" class="formItem">
                                        {{warehousingDetails.name || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="规格:" class="formItem">
                                        {{warehousingDetails.specification || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="可用库存:" class="formItem">
                                        {{warehousingDetails.avaCount || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="货品品牌:" class="formItem">
                                        {{warehousingDetails.brandId || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="长度:" class="formItem">
                                        {{warehousingDetails.length || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="分类:" class="formItem">
                                        {{warehousingDetails.categoryId || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="品牌名称:" class="formItem">
                                        {{warehousingDetails.brandName || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="供应商:" class="formItem">
                                        {{warehousingDetails.supplier || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="到货时间:" class="formItem">
                                        {{warehousingDetails.arrivalTime || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="订单状态:" class="formItem">
                                        {{warehousingDetails.orderStatus || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-dialog>
  </div>
</template>

<script>
    import VNolist from '@/components/no-list'
    // import warehouseDetail from '../warehouseComponents/warehouseDetail/warehouseDetail'
    import warehouseInfo from '../warehouseComponents/creatWarehouse/warehouseInfo'

    export default {
        components: {
            VNolist,
            // warehouseDetail,
            warehouseInfo
        },
        name: 'prodocut-table',
        updatedForm: {
            type: Object,
            required: true
        },
        data() {
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
                warehouseTitle: '新建仓库',
                currentWarehouse: '',
                newWarehousedialogVisible: false,
                warehouseDetaildialogVisible: false,
                loading: false,
                warehousingTable: [],
                warehousingDetails: {},
                brand_options: [],
                pageSize: 10,
                currentPage: 1,
                totalItem: 0,
                // 选中行信息
                // 选中行信息
                multipleSelection: {
                    id: []
                }
            }
        },
        methods: {
            /* 获取分页功能的：每页几条数据 */
            handleSizeChange(val) {
                this.postData.pageSize = val
                this.getWareHousingTable()
            },
            /* 获取分页功能的：当前是第几页 */
            handleCurrentChange(val) {
                this.postData.pageIndex = val
                this.getWareHousingTable()
            },
            /** 搜索 */
            search(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.postData = this.searchForm
                        this.getWareHousingTable()
                    } else {
                        console.log('error search!!')
                        return false
                    }
                })
            },
            /* 重置 */
            resetForm(formName) {
                this.$refs[formName].resetFields()
                this.getWareHousingTable()
            },
            getWareHousingTable() {
                this.$http.post('storageIn/list', this.postData).then(res => {
                    if (res.data.retCode === '000000') {
                        this.warehousingTable = res.data.apiResult
                        this.totalItem = res.data.count
                    }
                })
            },
            // 详情接口
            getWareHousingDetails(id) {
                this.$http.post('storageIn/detail', {id: id}).then(res => {
                    if (res.data.retCode === '000000') {
                        this.warehousingDetails = res.data.apiResult
                    }
                })
            },
            storageConfim() {
                if (this.multipleSelection.id.length > 0) {
                    this.$confirm('此操作将确认是否入库, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.post('storageOut/confirm', this.multipleSelection).then(res => {
                            if (res.data.retCode === '000000') {
                                this.$message({
                                    type: 'success',
                                    message: '入库确认成功!'
                                })
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消入库'
                        })
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请选择数据'
                    })
                }
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
                this.$tool.exportExcel(this, 'storageIn/exportOrders')
            },
             handleSelectionChange(val) {
                 this.multipleSelection.id = []
                 val.forEach((item, index) => {
                     this.multipleSelection.id.push(item.id)
                 })
            },
            // 状态转换
            status(val) {
                if (val.status === 1) {
                    return '待处理'
                } else if (val.status === 90) {
                    return '已确认'
                }
            },
            // 状态禁选
            unChecked(row) {
                if (row.status === 90) {
                    return false
                } else if (row.status === 1) {
                    return true
                }
            },
            outgoingDetail (row, column, cell, event) {
                console.log(row, column, cell, event)
                if (column.label === '货品编码') {
                    this.currentWarehouse = row.goodsId
                    this.warehouseDetaildialogVisible = true
                    this.getWareHousingDetails(row.id)
                }
            },
            cellStyle (row, column, rowIndex, columnIndex) {
                if (row.columnIndex === 1) {
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
            this.getWareHousingTable()
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
    .formItem {
        margin-bottom: 0px;
        label {
            text-align: left;
            width: unset!important;
        }
    }
</style>