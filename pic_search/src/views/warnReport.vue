<template>
    <div>
        <h4 class="base_situation">一、基本概况</h4>
        <div class="base_situation_content">为支持和促进电子商务健康发展，进一步规范电子商务管理运作，根据调查反馈，我们将专利系统产生预警的原因进行了总结分析，供各相关机构借鉴参考。</div>
        <div class="base_situation_content">例如，所预警{{baseObj.warnShop}}商品在电商平台淘宝中检索出共{{baseObj.warnShopNum}}个店家正在销售，卖家商铺平均信用为{{baseObj.averCredit}}，其中平均单价为{{baseObj.averPrice}}元，总销量为{{baseObj.totalSaled}}件。</div>
        <div class="base_situation_content">根据专利检索结果，{{baseObj.warnShop}}商品相关专利共有项，平均专利年龄{{baseObj.appearAveAge}}岁，专利平均强度为{{baseObj.appearAverStrong}}，专利申请分布{{baseObj.applArea}}，其中<span v-for="(item,index) in baseObj.applDetail" :key="index">{{item.province}}省份申请{{item.num}}项<span v-if="index<baseObj.applDetail.length-1">,</span></span>。</div>
        <h4 class="base_situation">二、地域分布和商家实力、专利价值对比情况</h4>
        <div class="base_situation_content">(1)本商品卖家分布{{barObj.sellDis}}，其中<span v-for="(item,index) in barObj.shopPro" :key="index">{{item}}<span v-if="index < barObj.shopPro.length - 1">、</span></span>为主要店铺所在地；商品产地分布{{barObj.produceDis}}，其中<span v-for="(item,index) in barObj.mainPro" :key="index">{{item}}地区<span v-if="index<barObj.mainPro.length-1">、</span></span>为主要商品生产地，具体情况如下：</div>
        <columnBarGraph v-if="baseFlag" :graphData="barObj.barData"></columnBarGraph>
        <div class="base_situation_content">(2)本专利原创申请地分布{{pieObj.layout}},其中<span v-for="(item,index) in pieObj.province" :key="index">{{item}}<span v-if="index<pieObj.province.length-1">、</span></span>为申请人主要所在地，主要分布在{{pieObj.lie}}地区，具体情况如下：</div>
        <pieChart v-if="baseFlag" :graphData="pieObj.pieData"></pieChart>
        <div class="base_situation_content">(3)本商品卖家表现{{rateObj.show}}，其中心级店铺{{rateObj.shopNum[0]||0}}家、钻级店铺{{rateObj.shopNum[1]||0}}家、冠级店铺{{rateObj.shopNum[2]||0}}家、天猫卖家{{rateObj.shopNum[3]||0}}家，具体情况如下：</div>
        <rate v-if="baseFlag" :rateNum="rateObj.rateData"></rate>
        <h4 class="base_situation">三、近期商品销售情况及专利申请量分析</h4>
        <div class="base_situation_content">本商品近期销售形势{{rowGraphData.tend}}，其中总销售量为{{rowGraphData.totalSales}}，各商铺平均销售量为{{rowGraphData.averSales}}，具体销售情况如下：</div>
        <rowBarGraph v-if="rowFlag" :graphData="rowGraphData"></rowBarGraph>
        <div class="base_situation_content">商品专利方面，本专利类别总专利量排名前十的申请人中，<span v-if="lineGraphData.applicant.length !== 0">有{{lineGraphData.applicant[0]}}和{{lineGraphData.applicant[1]||''}}</span>在近10年的此方面专利申请仍十分活跃；其余企业专利申请数呈{{lineGraphData.tend}}，具体趋势如下：</div>
        <lineChart v-if="lineFlag" :graphData="lineGraphData"></lineChart>
    </div>
</template>

<script>
import columnBarGraph from '../components/columnBarGraph'
import rowBarGraph from '../components/rowBarGraph'
import pieChart from '../components/pieChart'
import rate from '../components/rate'
import lineChart from '../components/lineChart'

import {getMainInventor,getSaleArea,getBaseArea} from '../api/index'
export default {
    data() {
        return {
            barData: {
                xAxisLabel: ['山东','广东','河北','浙江','江苏','北京'],
                yAxisAreaValue: [0,0,0,0,50,0],  //卖家分布数据
                yAxisPlaceValue: [1,50,3,4,2,2], //产地分布数据
                legend: ['卖家分布','产地分布']
            },
            pieData: [          // 数据数组，name 为数据项名称，value 为数据项值
                {value:235, name:'视频广告'},
                {value:274, name:'联盟广告'},
                {value:310, name:'邮件营销'},
                {value:335, name:'直接访问'},
                {value:400, name:'搜索引擎'}
            ],
            rateNum: [3,4,5,6],
            baseObj: {},
            barObj: {},
            pieObj: {},
            rateObj: {},
            rowGraphData: {},
            lineGraphData: {},
            lineFlag: false,
            rowFlag: false,
            baseFlag: false,
        }
    },
    mounted() {
        getMainInventor(this.$store.state.keyWords).then(res => {
            if(res.data.code === 0) {
                this.lineGraphData = JSON.parse(JSON.stringify(res.data.data))
                this.lineFlag = true
            }
        })
        getSaleArea(this.$store.state.keyWords).then(res => {
            if(res.data.code === 0) {
                this.rowGraphData = JSON.parse(JSON.stringify(res.data.data))
                this.rowFlag = true
            }
        })
        getBaseArea(this.$store.state.keyWords).then(res => {
            if(res.data.code === 0) {
                let obj = JSON.parse(JSON.stringify(res.data.data))
                console.log(777,obj)
                this.baseObj = obj.baseObj
                this.barObj = obj.barObj
                this.pieObj = obj.pieObj
                this.rateObj = obj.rateObj
                this.baseFlag = true
            }
        })
    },
    components: {
        columnBarGraph,
        rowBarGraph,
        pieChart,
        rate,
        lineChart,
    }
}
</script>

<style lang="scss" scoped>
.base_situation_content {
    text-indent: 1cm;
    color: rgba(0,0,0,.7);
    font-size: 14px;
}
</style>