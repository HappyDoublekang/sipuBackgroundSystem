<template>
    <div slot="empty" class="no-info">
        <img src="./no-data.png" class="img">
        <span class="text-info">{{text}}</span>
    </div>
</template>
<script>
    export default {
        props: {
            text: String
        }
    }
</script>
<style>
    .el-table__empty-block{
        min-height: 300px!important;
    }
    .no-info{
        overflow: hidden;
        width:270px;
        margin:0 auto;
        position: relative;
    }
    .no-info .img{
        float: left;
    }
    .no-info .text-info{
        float: left;
        width:135px;
        text-align: left;
        color:#999;
        position: absolute;
        right: 0;
        left:55%;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform:translateY(-50%);
        -moz-transform:translateY(-50%);
        -ms-transform:translateY(-50%);
    }
</style>
