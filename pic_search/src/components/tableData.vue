<template>
    <div>
        <el-table 
            :data="dataList"
            border
            :header-cell-style="{'text-align':'center','background':'rgba(0,0,0,.05)'}">
            <el-table-column v-for="(item,index) in headData" 
                :key="index"
                :prop="item.key" 
                :label="item.title" 
                :width="item.width"
                align="center"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'tableData',
    props: {
        headData: {
            type: Array,
            require: true,
        },
        dataList: {
            type: Array,
            require: true,
        }
    },
}
</script>

<style lang="scss" scoped>
</style>