<template>
  <div>
    <el-row type="flex" align="middle">
      <el-col :span="2">
        <el-button type="primary" @click="newOrderNotedialogVisible=true">添加</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary">快捷编辑</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%;" height="400" highlight-current-row>
      <el-table-column prop="name" label="操作员" show-overflow-tooltip width="100"></el-table-column>
      <el-table-column prop="content" label="内容" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="date" label="时间" show-overflow-tooltip ></el-table-column>
    </el-table>
    <el-dialog
      title="添加订单标签"
      :visible.sync="newOrderNotedialogVisible"
      append-to-body="true"
      width="40%">
      <div>
        <el-form ref="form" :model="form" label-width="95px">
          <el-form-item label="快捷选项编辑">
            <el-select></el-select>
          </el-form-item>
        </el-form>
        <el-input type="textarea" :rows="5" placeholder="请输入取消原因" :maxlength="200" v-model="yuan" resize="none" show-word-limit></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newOrderNotedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newOrderNotedialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      newOrderNotedialogVisible: false,
      yuan: '',
      form: {},
      tableData: [
        {
          name: '张三',
          content: '做了什么做了什么做了什么做了什么做了什么做了什么做了什么',
          date: '2019-05-17 23:23:14'
        },
        {
          name: '张三',
          content: '做了什么做了什么做了什么做了什么做了什么做了什么做了什么',
          date: '2019-05-17 23:23:14'
        },
        {
          name: '张三',
          content: '做了什么做了什么做了什么做了什么做了什么做了什么做了什么',
          date: '2019-05-17 23:23:14'
        },
        {
          name: '张三',
          content: '做了什么做了什么做了什么做了什么做了什么做了什么做了什么',
          date: '2019-05-17 23:23:14'
        },
        {
          name: '张三',
          content: '做了什么做了什么做了什么做了什么做了什么做了什么做了什么',
          date: '2019-05-17 23:23:14'
        },
        {
          name: '张三',
          content: '做了什么做了什么做了什么做了什么做了什么做了什么做了什么',
          date: '2019-05-17 23:23:14'
        },
        {
          name: '张三',
          content: '做了什么做了什么做了什么做了什么做了什么做了什么做了什么',
          date: '2019-05-17 23:23:14'
        }
      ]
    }
  }
}
</script>

