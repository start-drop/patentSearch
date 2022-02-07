<template>
    <div>
        <columnBarGraph v-if="columnFlag" :graphData="graphData1"></columnBarGraph>
        <div class="line"></div>
        <tableData :headData="headData" :dataList="dataList"></tableData>
        <div class="line"></div>
        <rowBarGraph v-if="rowFlag" :graphData="graphData2"></rowBarGraph>
    </div>
</template>

<script>
import columnBarGraph from '../components/columnBarGraph'
import rowBarGraph from '../components/rowBarGraph'
import tableData from '../components/tableData'
import {getTableData,getColumnData,getRowData} from '../api/index'
export default {
    props: {

    },
    data() {
        return {
            graphData1: {},
            graphData2: {},
            headData: [
                {
                    title: '商品',
                    key: 'store',
                    width: 100,
                },
                {
                    title: '工商执照',
                    key: 'license',
                    width: 100,
                },
                {
                    title: '信誉',
                    key: 'credit',
                    width: 100,
                },
                {
                    title: '月销量',
                    key: 'monthSales',
                    width: 100,
                },
                {
                    title: '售后率',
                    key: 'afterSaleRate',
                    width: 100,
                }

            ],
            dataList: [],
            columnFlag: false,
            rowFlag: false,
        }
    },
    methods: {
        
    },
    mounted() {
       getTableData(this.$store.state.keyWords).then(res => {
           const resData = res.data
           if(resData.code === 0) {
               this.dataList = resData.data.tableList
           }
       })
        getColumnData(this.$store.state.keyWords).then(res => {
           const resData = res.data
           if(resData.code === 0) {
               let obj = {
                   xAxisLabel: resData.data.xAxisLabel.split(','),
                   yAxisPlaceValue: resData.data.yAxisPlaceValue.split(','),
                   yAxisAreaValue: resData.data.yAxisAreaValue.split(','),
                   legend: resData.data.legend.split(','),
               }
            this.graphData1 = obj
            this.columnFlag = true
           }
       })
       getRowData(this.$store.state.keyWords).then(res => {
           const resData = res.data
           if(resData.code === 0) {
               let obj = {
                   legendText: resData.data.legendText,
                   yAxisLabel: resData.data.yAxisLabel.split(','),
                   xAxisValue: resData.data.xAxisValue.split(','),
               }
            this.graphData2 = obj
            this.rowFlag = true
           }
       })
    },
    components: {
        columnBarGraph,
        rowBarGraph,
        tableData,
    },
}
</script>

<style lang="scss" scoped>
.line {
    background: #ddd;
    height: 4px;
    margin: 10px 0;
}

</style>
