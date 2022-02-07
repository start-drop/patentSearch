<template>
    <el-table 
        :data="tableData" 
        border stripe>
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column label="图片" prop="imgUrl" width="120px" align="center">
            <template slot-scope="scope">
                <div class="img_contain">
                    <img :src="scope.row.imgUrl" alt="">
                </div>
            </template>
        </el-table-column>
        <el-table-column 
            v-for="(item,index) in headData.right"
            :key="index"
            :label="item.label" 
            :prop="item.key" 
            :width="item.width"
            align="center">
        </el-table-column>
        
        <el-table-column label="操作" width="190px" align="center">
            <template slot-scope="scope">
                <el-tooltip effect="light" content="详情" placement="bottom">
                    <el-button type="info" icon="el-icon-more" size="mini" @click="headData.left.handleToDetail(scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip effect="light" content="编辑" placement="bottom" v-if="isShowBtn">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="headData.left.handleEditItem(scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip effect="light" content="删除" placement="bottom" v-if="isShowBtn">
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="headData.left.handleDelete(scope.row)"></el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props: {
        tableData: {
            type: Array,
            require: true,
        },
        headData: {
            type: Object,
            require: true,
        }
    },
    data() {
        return {
            isShowBtn: false
        }
    },
    methods: {
        
    },
    mounted() {
        this.isShowBtn = sessionStorage.getItem('isManangement') === '1'
    }
}
</script>

<style lang="scss" scoped>
.img_contain {
    width: 100px;
    height: 100px;
    background: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    img {
        width : 100%;
        height: 100%;
    }
}

</style>