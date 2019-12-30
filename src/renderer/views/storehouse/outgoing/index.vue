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
                        <el-input class="w160" v-model="searchForm.id" placeholder="出库单号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="w100" type="primary" plain @click="search('searchForm')">搜索</el-button>
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
                <el-button type="primary" size="mini" @click="storageConfim()">出库确认</el-button>
            </el-col>
        </el-row>
        <br>
        <el-table resizable border :data="outgoingTable" ref="multipleTable" v-loading="loading"  @selection-change="handleSelectionChange" style="width: 100%;" height="605" @cell-click="outgoingDetail" :cell-style="cellStyle">
            <el-table-column type="selection" width="55" :selectable='unChecked'></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="goodsId" label="货品编码"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" align="left" prop="id" label="出库单号"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="brandName" label="货品品牌"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="name" label="货品名称"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="specification" label="规格"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="length" label="长度（CM）"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="count" label="数量"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="type" label="分类"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="status" label="处理状态" :formatter='status'></el-table-column>
            <!-- <el-table-column :show-overflow-tooltip="true" prop="avaCount" label="可用库存"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="count" label="总库存"></el-table-column> -->
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
            <warehouseInfo 
                @newWarehousedialogVisible='getNewWarehousedialogVisible'
                @newWarehouseFormData='getNewWarehouseFormData'></warehouseInfo>
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
                    <el-tab-pane label="出库">
                        <el-form ref="form" label-width="90px">
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="出库单号:" class="formItem">
                                        {{outgoingDetails.id || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="外部单号:" class="formItem">
                                        {{outgoingDetails.reqNo || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="出库类型:" class="formItem">
                                        {{outgoingDetails.type || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="货品编号:" class="formItem">
                                        {{outgoingDetails.goodsId || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="数量:" class="formItem">
                                        {{outgoingDetails.count || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="业务类型:" class="formItem">
                                        {{outgoingDetails.bizType || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="状态:" class="formItem">
                                        {{outgoingDetails.status || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="工艺要求:" class="formItem">
                                        {{outgoingDetails.gongYi || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="创建时间:" class="formItem">
                                        {{outgoingDetails.createDatetime || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="修改时间:" class="formItem">
                                        {{outgoingDetails.updateDatetime || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="货品名称:" class="formItem">
                                        {{outgoingDetails.name || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="规格:" class="formItem">
                                        {{outgoingDetails.specification || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="可用库存:" class="formItem">
                                        {{outgoingDetails.avaCount || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="货品品牌:" class="formItem">
                                        {{outgoingDetails.brandId || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="长度:" class="formItem">
                                        {{outgoingDetails.length || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="分类:" class="formItem">
                                        {{outgoingDetails.categoryId || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="品牌名称:" class="formItem">
                                        {{outgoingDetails.brandName || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="订单创建时间:" class="formItem">
                                        {{outgoingDetails.orderCreateDatetime || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="订单修改时间:" class="formItem">
                                        {{outgoingDetails.orderUpdateDatetime || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="订单类型:" class="formItem">
                                        {{outgoingDetails.orderType || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="物流费用:" class="formItem">
                                        {{outgoingDetails.postage || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="支付方式:" class="formItem">
                                        {{outgoingDetails.payType || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="支付账号:" class="formItem">
                                        {{outgoingDetails.payAccount || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="买家备注:" class="formItem">
                                        {{outgoingDetails.buyerRemark || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="客服备注:" class="formItem">
                                        {{outgoingDetails.serviceRemark || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="应收金额:" class="formItem">
                                        {{outgoingDetails.receivableMoney || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="优惠金额:" class="formItem">
                                        {{outgoingDetails.discountMoney || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="实收金额:" class="formItem">
                                        {{outgoingDetails.actualMoney || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="签出人:" class="formItem">
                                        {{outgoingDetails.checkOutMan || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="签出时间:" class="formItem">
                                        {{outgoingDetails.checkOutTime || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="取消理由:" class="formItem">
                                        {{outgoingDetails.cancelReason || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="生产方式:" class="formItem">
                                        {{outgoingDetails.productionMode || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="字体颜色:" class="formItem">
                                        {{outgoingDetails.fontColorUuid || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="卖家备注旗帜:" class="formItem">
                                        {{outgoingDetails.sellerFlag || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="商店id:" class="formItem">
                                        {{outgoingDetails.storeId || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="发货方式id:" class="formItem">
                                        {{outgoingDetails.logisticsModeId || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="店铺名称:" class="formItem">
                                        {{outgoingDetails.storeName || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="货品总量:" class="formItem">
                                        {{outgoingDetails.goodsNumber || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="货品种类数:" class="formItem">
                                        {{outgoingDetails.typeNumber || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="业务员:" class="formItem">
                                        {{outgoingDetails.salesman || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="下单时间:" class="formItem">
                                        {{outgoingDetails.orderDatetime || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="付款时间:" class="formItem">
                                        {{outgoingDetails.payDatetime || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="发货时间:" class="formItem">
                                        {{outgoingDetails.sendDatetime || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="客户网名:" class="formItem">
                                        {{outgoingDetails.customerNetName || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="货运单号:" class="formItem">
                                        {{outgoingDetails.logisticsOrderNo || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="客户收件地址信息id:" class="formItem">
                                        {{outgoingDetails.customerPlaceId || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="驳回原因:" class="formItem">
                                        {{outgoingDetails.refuseReason || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="订单状态:" class="formItem">
                                        {{outgoingDetails.orderStatus || '-'}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="6">
                                    <el-form-item label="订单编号:" class="formItem">
                                        {{outgoingDetails.orderId || '-'}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="原始单号:" class="formItem">
                                        {{outgoingDetails.originOrderNo || '-'}}
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
                newWarehouseFormData: {},
                warehouseDetaildialogVisible: false,
                loading: false,
                outgoingTable: [],
                outgoingDetails: {},
                brand_options: [],
                pageSize: 10,
                currentPage: 1,
                totalItem: 0,
                // 选中行信息
                multipleSelection: {
                    id: []
                }
                // warehouseUuid: window.sessionStorage.getItem('WarehousUuid'),
            }
        },
        methods: {
            /* 获取分页功能的：每页几条数据 */
            handleSizeChange(val) {
                this.postData.pageSize = val
                this.getOutGoingTable()
            },
            /* 获取分页功能的：当前是第几页 */
            handleCurrentChange(val) {
                this.postData.pageIndex = val
                this.getOutGoingTable()
            },
             /** 搜索 */
            search(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.postData = this.searchForm
                        this.getOutGoingTable()
                    } else {
                        console.log('error search!!')
                        return false
                    }
                })
            },
            /* 重置 */
            resetForm(formName) {
                this.$refs[formName].resetFields()
                this.getOutGoingTable()
            },
            // 列表接口
            getOutGoingTable() {
                this.$http.post('storageOut/list', this.postData).then(res => {
                    if (res.data.retCode === '000000') {
                        this.outgoingTable = res.data.apiResult
                        this.totalItem = res.data.count
                    }
                })
            },
            // 详情接口
            getOutGoingDetails(id) {
                this.$http.post('storageOut/detail', {id: id}).then(res => {
                    if (res.data.retCode === '000000') {
                        this.outgoingDetails = res.data.apiResult
                    }
                })
            },
            storageConfim() {
                if (this.multipleSelection.id.length > 0) {
                    this.$confirm('此操作将确认是否出库, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.post('storageOut/confirm', this.multipleSelection).then(res => {
                            if (res.data.retCode === '000000') {
                                this.$message({
                                    type: 'success',
                                    message: '出库确认成功!'
                                })
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消出库'
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
                this.$tool.exportExcel(this, 'storageOut/exportOrders')
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
                    this.getOutGoingDetails(row.id)
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
            },
            getNewWarehouseFormData (msg) {
                this.newWarehouseFormData = msg
                this.$http.post('storageOut/insert', this.newWarehouseFormData).then(res => {
                    if (res.data.retCode === '000000') {
                        this.$message({
                            type: 'success',
                            message: '新建成功!'
                        })
                    }
                })
            }
        },
        mounted () {
            this.queryBrands()
            this.getOutGoingTable()
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