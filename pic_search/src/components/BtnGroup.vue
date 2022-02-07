<template>
    <div class="btn_group">
        <el-button type="primary" @click="handleConfirm">确认</el-button>
        <el-button @click="handleCancel">取消</el-button>
    </div>
</template>

<script>
export default {
    methods: {
        handleConfirm() {
            this.$emit('confirm')
        },
        handleCancel() {
            this.$emit('cancel')
        }
    },
}
</script>

<style lang="scss" scoped>
.btn_group {
    padding-left: 200px;
    .el-button {
        margin-right: 20px;
    }
}
</style>