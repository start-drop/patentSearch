<template>
<div class="contain">
    <el-container>
        <el-header style="height:200px">
            <headPic :headData="headData" :showDesc='true'></headPic>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu
                    default-active="/warnAnalysis"
                    class="el-menu-vertical-demo"
                    background-color="#409EFF"
                    text-color="#fff"
                    router
                    active-text-color="#ffd04b"
                    @select="handleSelect">
                    <el-menu-item index="/warnAnalysis">
                        <i class="el-icon-document"></i>
                        <span slot="title">预警分析</span>
                    </el-menu-item>
                    <el-menu-item index="/warnReport">
                        <i class="el-icon-reading"></i>
                        <span slot="title">预警报告</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
import headPic from '../components/headPic'
export default {
    data() {
        return {
           queryKey: '',
           headData: {
               picPath: '',
               shopName: '',
           }
        }
    },
    methods: {
        handleSelect(e) {
            console.log(123,e)
        },
        
    },
    mounted() {
        let query = this.$route.query
       this.queryKey = query.key
       this.headData.shopName = query.key
       this.headData.picPath = query.picPath
       console.log(this.headData)
    },
    components: {
        headPic
    },
}
</script>

<style lang="scss" scoped>
section {
    height: 100vh;
}
.el-container {
    height: 100%;
}
.el-header {
    background: #666;
    display: flex;
    align-items: center;
}
.line {
    background: #000;
    height: 3px;
}
.el-menu {
    height: 100%;
    .el-menu-item i {
        color: #fff;
        font-size: 18px;
        margin-right: 6px;
    }
}
</style>