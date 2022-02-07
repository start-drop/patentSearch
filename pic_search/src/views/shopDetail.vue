<template>
    <div>
        <div class="shop_detail_contain">
            <div class="img_container">
                <img :src="infoData.imgUrl" alt="">
            </div>
            <div class="shop_information">
                <div class="shop_name">{{infoData.storeName}}</div>
                <div class="detail_title">商品详情:</div>
                <div class="info_item" v-for="(item,index) in infos" :key="index">
                    <div class="info_name">{{item.name}}</div>
                    <div class="info_val">{{infoData[item.key]}}</div>
                </div>
            </div>
        </div>
        <el-button type="info" @click="goBack"><i class="el-icon-back"></i> 返回</el-button>
    </div>
</template>

<script>
import {getStoreDetail} from '../api/index'
export default {
    mounted() {
        this.queryKey = this.$route.query.key
        getStoreDetail(this.queryKey).then(res => {
            const resData = res.data
            if(resData.code === 0) {
                this.infoData = JSON.parse(JSON.stringify(resData.data.infoObj))
            }
        }) 
    },
    data() {
        return {
            infos: [
                {name: '店铺：',key: 'shop'},
                {name: '价格：',key: 'price'},
                {name: '店铺地址：',key: 'address'},
                {name: '月销量：',key: 'monthSales'},
                {name: '颜色分类：',key: 'colorSort'},
                {name: '累计评价：',key: 'comment'},
                {name: '人气：',key: 'popularity'},
                {name: '信誉：',key: 'credit'},
                {name: '工商执照：',key: 'license'},
                {name: '描述相符：',key: 'description'},
                {name: '服务态度：',key: 'serviceAttitude'},
            ],
            infoData: {},
            queryKey: '',
        }
    },
    methods: {
        goBack() {
            this.$router.back()
        }
    },
}
</script>

<style lang="scss" scoped>
.el-button {
    margin-left: 80%;
}
.shop_detail_contain {
    width: 70%;
    margin: 100px auto;
    display: flex;
    .img_container {
        flex: 5;
        padding: 10px 10px;
        img {
            width: 100%;
            height: 400px;
        }
    }
    .shop_information {
        margin: 10px auto auto 30px;
        flex: 7;
        .shop_name {
            width: 400px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: 18px;
            font-weight: 550;
            margin-bottom: 10px;
        }
        .detail_title {
            margin-bottom: 18px;
            font-size: 14px;
            color: #999;
            font-weight: 600;
        }
        .info_item {
            display: flex;
            font-size: 14px;
            color: #666;
            .info_name {
                width: 100px;
                height: 30px;
            }
        }
    }
    
    
}
</style>