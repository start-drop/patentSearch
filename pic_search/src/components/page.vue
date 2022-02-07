<template>
    <el-pagination background
        layout="sizes,prev,pager,next"
        :total="pageData.totalNum"
        :page-sizes="pageSizeOption"
        :page-size="pageData.pageSize"
        :current-page.sync="pageData.currentPage"
        @current-change="handleChangeCurPage"
        @size-change="handleChangePageSize">
    </el-pagination>
</template>

<script>
export default {
    props: {
        pageData: {
            type: Object,
            require: true
        },
        pageSizeOption: {
            type: Array,
            default: function() {
                return [10,20,50,100]
            }
        }
    },
    data() {
        return {

        }
    },
    methods: {
        handleChangeCurPage(page) {
            this.$emit('change',page,this.pageData.pageSize)
        },
        handleChangePageSize(pageSize) {
            this.$emit('change',this.pageData.currentPage,pageSize)
        }
    },
}
</script>

<style lang="scss" scoped>

</style>