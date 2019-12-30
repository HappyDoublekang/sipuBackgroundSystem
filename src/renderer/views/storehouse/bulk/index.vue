<template>
    <div>
        <!-- <div class="mgb15">
            <el-button type="primary" @click="exportExcel"><i class="iconfont icon-daochu"></i>导出</el-button>
        </div> -->
        <div class="search-condition">
            <el-form inline ref="searchForm" :model="searchForm" label-width="80px" style="overflow: hidden;">
                <el-col>
                    <el-form-item label="筛选条件:">
                        <el-select class="w160" v-model="searchForm.brandId" placeholder="货品品牌">
                            <el-option v-for="item in brand_options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select class="w160" v-model="searchForm.brandId" placeholder="品牌">
                            <el-option v-for="item in brand_options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="筛选条件:">
                        <el-input class="w160" v-model="searchForm.brandId" placeholder="订单编号"></el-input>
                        <el-input class="w160" v-model="searchForm.brandId" placeholder="发件人"></el-input>
                        <el-input class="w160" v-model="searchForm.brandId" placeholder="收件人"></el-input>
                        <el-button class="w100" type="primary" plain>搜索</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </div>
        <el-row type="flex" align="middle" justify="start">
            <el-col :span="2">
                <el-button type="primary" size="mini" @click="createWarehouse">调拨</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" size="mini" >盘点</el-button>
            </el-col>
        </el-row>
        <br>
        <el-table resizable border :data="inventoryTable" ref="multipleTable" v-loading="loading" style="width: 100%;" height="560" @cell-click="outgoingDetail" :cell-style="cellStyle">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="huopindanhao" label="货品单号"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="gongyingshag" label="供应商"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="gonghuomingcheng" label="供货名称"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="zongjine" label="总金额"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="caigouyuan" label="采购员"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="chuangjianshijian" label="创建时间"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="yujidaoqishijian" label="预计到期时间"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="zhuangtai" label="状态"></el-table-column>
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
                关联编号：{{currentWarehouse}}
                </div>
                <div class="content btn" @click="nextWarehouse">
                <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div>
                <el-table :data="tableData" style="width: 100%;" height="400" highlight-current-row>
                    <el-table-column prop="status" label="货品编码" show-overflow-tooltip ></el-table-column>
                    <el-table-column prop="name" label="货品名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="shou" label="品牌" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="type" label="分类" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="phone" label="规格" show-overflow-tooltip ></el-table-column>
                    <el-table-column prop="fail" label="数量" show-overflow-tooltip ></el-table-column>
                    <el-table-column prop="sumprice" label="单价（元）" show-overflow-tooltip ></el-table-column>
                    <el-table-column prop="trueprice" label="单重" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="orderdate" label="预估总量" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="orderdate" label="总价" show-overflow-tooltip></el-table-column>
                </el-table>
            </div>
        </el-dialog>
  </div>
</template>

<script>
    import VNolist from '@/components/no-list'
    import warehouseInfo from '../warehouseComponents/creatWarehouse/warehouseInfo'

    export default {
        components: {
            VNolist,
            warehouseInfo
        },
        name: 'prodocut-table',
        updatedForm: {
            type: Object,
            required: true
        },
        data() {
            return {
                warehouseTitle: '新建仓库',
                currentWarehouse: '',
                newWarehousedialogVisible: false,
                warehouseDetaildialogVisible: false,
                loading: false,
                inventoryTable: [
                    {
                        huopindanhao: '10000',
                        gongyingshag: '金坷垃',
                        gonghuomingcheng: '金坷垃吸收地下一百米氮磷钾',
                        zongjine: '100,000',
                        caigouyuan: 'yiF',
                        chuangjianshijian: '2018.08.18',
                        yujidaoqishijian: '2018.08.18',
                        zhuangtai: '初始'
                    },
                    {
                        huopindanhao: '10000',
                        gongyingshag: '金坷垃',
                        gonghuomingcheng: '金坷垃吸收地下一百米氮磷钾',
                        zongjine: '100,000',
                        caigouyuan: 'yiF',
                        chuangjianshijian: '2018.08.18',
                        yujidaoqishijian: '2018.08.18',
                        zhuangtai: '初始'
                    },
                    {
                        huopindanhao: '10000',
                        gongyingshag: '金坷垃',
                        gonghuomingcheng: '金坷垃吸收地下一百米氮磷钾',
                        zongjine: '100,000',
                        caigouyuan: 'yiF',
                        chuangjianshijian: '2018.08.18',
                        yujidaoqishijian: '2018.08.18',
                        zhuangtai: '初始'
                    },
                    {
                        huopindanhao: '10000',
                        gongyingshag: '金坷垃',
                        gonghuomingcheng: '金坷垃吸收地下一百米氮磷钾',
                        zongjine: '100,000',
                        caigouyuan: 'yiF',
                        chuangjianshijian: '2018.08.18',
                        yujidaoqishijian: '2018.08.18',
                        zhuangtai: '初始'
                    },
                    {
                        huopindanhao: '10000',
                        gongyingshag: '金坷垃',
                        gonghuomingcheng: '金坷垃吸收地下一百米氮磷钾',
                        zongjine: '100,000',
                        caigouyuan: 'yiF',
                        chuangjianshijian: '2018.08.18',
                        yujidaoqishijian: '2018.08.18',
                        zhuangtai: '初始'
                    },
                    {
                        huopindanhao: '10000',
                        gongyingshag: '金坷垃',
                        gonghuomingcheng: '金坷垃吸收地下一百米氮磷钾',
                        zongjine: '100,000',
                        caigouyuan: 'yiF',
                        chuangjianshijian: '2018.08.18',
                        yujidaoqishijian: '2018.08.18',
                        zhuangtai: '初始'
                    },
                    {
                        huopindanhao: '10000',
                        gongyingshag: '金坷垃',
                        gonghuomingcheng: '金坷垃吸收地下一百米氮磷钾',
                        zongjine: '100,000',
                        caigouyuan: 'yiF',
                        chuangjianshijian: '2018.08.18',
                        yujidaoqishijian: '2018.08.18',
                        zhuangtai: '初始'
                    },
                    {
                        huopindanhao: '10000',
                        gongyingshag: '金坷垃',
                        gonghuomingcheng: '金坷垃吸收地下一百米氮磷钾',
                        zongjine: '100,000',
                        caigouyuan: 'yiF',
                        chuangjianshijian: '2018.08.18',
                        yujidaoqishijian: '2018.08.18',
                        zhuangtai: '初始'
                    },
                    {
                        huopindanhao: '10000',
                        gongyingshag: '金坷垃',
                        gonghuomingcheng: '金坷垃吸收地下一百米氮磷钾',
                        zongjine: '100,000',
                        caigouyuan: 'yiF',
                        chuangjianshijian: '2018.08.18',
                        yujidaoqishijian: '2018.08.18',
                        zhuangtai: '初始'
                    },
                    {
                        huopindanhao: '10000',
                        gongyingshag: '金坷垃',
                        gonghuomingcheng: '金坷垃吸收地下一百米氮磷钾',
                        zongjine: '100,000',
                        caigouyuan: 'yiF',
                        chuangjianshijian: '2018.08.18',
                        yujidaoqishijian: '2018.08.18',
                        zhuangtai: '初始'
                    }
                ],
                tableData: [
                    {
                    type: '1234567890ABCD',
                    status: '字符最多六个',
                    name: '字符最多可以有十个字',
                    shou: '字最多五个',
                    phone: '17704628697',
                    fail: '字符最多可以拥有十三个字啊',
                    sumprice: '12345.00',
                    trueprice: '12345.00',
                    orderdate: '2019.05.12 01:01:01',
                    paydate: '2019.05.12 01:01:01'
                    },
                    {
                    type: '1234567890ABCD',
                    status: '字符最多六个',
                    name: '字符最多可以有十个字',
                    shou: '字最多五个',
                    phone: '17704628697',
                    fail: '字符最多可以拥有十三个字啊',
                    sumprice: '12345.00',
                    trueprice: '12345.00',
                    orderdate: '2019.05.12 01:01:01',
                    paydate: '2019.05.12 01:01:01'
                    },
                    {
                    type: '1234567890ABCD',
                    status: '字符最多六个',
                    name: '字符最多可以有十个字',
                    shou: '字最多五个',
                    phone: '17704628697',
                    fail: '字符最多可以拥有十三个字啊',
                    sumprice: '12345.00',
                    trueprice: '12345.00',
                    orderdate: '2019.05.12 01:01:01',
                    paydate: '2019.05.12 01:01:01'
                    },
                    {
                    type: '1234567890ABCD',
                    status: '字符最多六个',
                    name: '字符最多可以有十个字',
                    shou: '字最多五个',
                    phone: '17704628697',
                    fail: '字符最多可以拥有十三个字啊',
                    sumprice: '12345.00',
                    trueprice: '12345.00',
                    orderdate: '2019.05.12 01:01:01',
                    paydate: '2019.05.12 01:01:01'
                    },
                    {
                    type: '1234567890ABCD',
                    status: '字符最多六个',
                    name: '字符最多可以有十个字',
                    shou: '字最多五个',
                    phone: '17704628697',
                    fail: '字符最多可以拥有十三个字啊',
                    sumprice: '12345.00',
                    trueprice: '12345.00',
                    orderdate: '2019.05.12 01:01:01',
                    paydate: '2019.05.12 01:01:01'
                    },
                    {
                    type: '1234567890ABCD',
                    status: '字符最多六个',
                    name: '字符最多可以有十个字',
                    shou: '字最多五个',
                    phone: '17704628697',
                    fail: '字符最多可以拥有十三个字啊',
                    sumprice: '12345.00',
                    trueprice: '12345.00',
                    orderdate: '2019.05.12 01:01:01',
                    paydate: '2019.05.12 01:01:01'
                    },
                    {
                    type: '1234567890ABCD',
                    status: '字符最多六个',
                    name: '字符最多可以有十个字',
                    shou: '字最多五个',
                    phone: '17704628697',
                    fail: '字符最多可以拥有十三个字啊',
                    sumprice: '12345.00',
                    trueprice: '12345.00',
                    orderdate: '2019.05.12 01:01:01',
                    paydate: '2019.05.12 01:01:01'
                    },
                    {
                    type: '1234567890ABCD',
                    status: '字符最多六个',
                    name: '字符最多可以有十个字',
                    shou: '字最多五个',
                    phone: '17704628697',
                    fail: '字符最多可以拥有十三个字啊',
                    sumprice: '12345.00',
                    trueprice: '12345.00',
                    orderdate: '2019.05.12 01:01:01',
                    paydate: '2019.05.12 01:01:01'
                    },
                    {
                    type: '1234567890ABCD',
                    status: '字符最多六个',
                    name: '字符最多可以有十个字',
                    shou: '字最多五个',
                    phone: '17704628697',
                    fail: '字符最多可以拥有十三个字啊',
                    sumprice: '12345.00',
                    trueprice: '12345.00',
                    orderdate: '2019.05.12 01:01:01',
                    paydate: '2019.05.12 01:01:01'
                    },
                    {
                    type: '1234567890ABCD',
                    status: '字符最多六个',
                    name: '字符最多可以有十个字',
                    shou: '字最多五个',
                    phone: '17704628697',
                    fail: '字符最多可以拥有十三个字啊',
                    sumprice: '12345.00',
                    trueprice: '12345.00',
                    orderdate: '2019.05.12 01:01:01',
                    paydate: '2019.05.12 01:01:01'
                    },
                    {
                    type: '1234567890ABCD',
                    status: '字符最多六个',
                    name: '字符最多可以有十个字',
                    shou: '字最多五个',
                    phone: '17704628697',
                    fail: '字符最多可以拥有十三个字啊',
                    sumprice: '12345.00',
                    trueprice: '12345.00',
                    orderdate: '2019.05.12 01:01:01',
                    paydate: '2019.05.12 01:01:01'
                    },
                    {
                    type: '1234567890ABCD',
                    status: '字符最多六个',
                    name: '字符最多可以有十个字',
                    shou: '字最多五个',
                    phone: '17704628697',
                    fail: '字符最多可以拥有十三个字啊',
                    sumprice: '12345.00',
                    trueprice: '12345.00',
                    orderdate: '2019.05.12 01:01:01',
                    paydate: '2019.05.12 01:01:01'
                    }
                ],
                pageNum: 1,
                pageSize: 10,
                currentPage: 1,
                totalItem: 400,
                // 选中行信息
                multipleSelection: [],
                // warehouseUuid: window.sessionStorage.getItem('WarehousUuid'),
                searchForm: {
                    brandId: '',
                    categoryId: 0
                }
            }
        },
        methods: {
            /* 获取分页功能的：每页几条数据 */
            handleSizeChange(val) {
                this.pageSize = val
                this.getOutGoingTable()
            },
            /* 获取分页功能的：当前是第几页 */
            handleCurrentChange(val) {
                this.pageNum = val
                this.getOutGoingTable()
            },
            getOutGoingTable() {
                this.$http.post('/batchStorageIn/list', {
                    'id': 1
                    }).then(res => {
                    console.log(111)
                })
            },
            outgoingDetail (row, column, cell, event) {
                console.log(row, column, cell, event)
                if (column.label === '货品单号') {
                    this.currentWarehouse = row.huopindanhao
                    this.warehouseDetaildialogVisible = true
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
</style>