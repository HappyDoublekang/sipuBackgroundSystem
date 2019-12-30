<template>
  <div>
    <el-row type="flex" align="middle">
      <el-col :span="2">
        <el-button type="primary">添加</el-button>
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
  </div>
</template>
<script>
export default {
  data () {
    return {
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

