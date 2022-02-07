<template>
    <div>
        <div class="head_contain">
            <headPic :inputValue="inputValue" @upload="init()"></headPic>
        </div>
        <div class="btn_group" v-if="isShowBtn">
            <el-button type="primary" @click="handleToAdd('/appearance/add')">专利新增</el-button>
            <el-button type="primary" @click="handleToAdd('/shop/add')">商品新增</el-button>
        </div>
        <el-tabs type="border-card" @tab-click="handleChangeTab">
            <el-tab-pane label="外观专利">
                <Appearance name="appearancePatent" ref="appearance"></Appearance>
            </el-tab-pane>
            <el-tab-pane label="平台商品">
                <Appearance name="platformGoods"></Appearance>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import headPic from '../components/headPic'
import Appearance from '../components/Appearance'
    export default {
        data() {
            return {
                inputValue: '',
                isShowBtn: false,
            }
        },
        methods: {
            handleChangeTab(tab,event) {
                console.log(tab,event)
            },
            handleToAdd(path) {
                this.$router.push(path)
            },
            init() {
                this.$refs.appearance.initList()
            }
        },
        mounted() {
            const query = this.$route.query
            this.inputValue = query.inputValue || (query.searchObj && query.searchObj.keyWord)|| ''
            let isClear = query.isClear || false
            this.isShowBtn = sessionStorage.getItem('isManangement') === '1'
            if(this.inputValue !== '' && isClear) {
                this.$store.commit('setPicPath', '')
            }
        },
        components: {
            headPic,
            Appearance
        },
    }
</script>

<style lang="scss" scoped>
.head_contain {
    padding: 10px;
    background: #666;
}
.btn_group {
    margin: 20px;
}
</style>