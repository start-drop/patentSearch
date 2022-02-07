<template>
    <div ref="warnAnalysisEchart" class="echart_contain"></div>
</template>

<script>
export default {
    props: {
        graphData: {
            type: Object,
            require: true,
        }
    },
    data() {
        return {
            chartOption: {
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: this.graphData.legend
                },
                xAxis: {
                    type: 'category',
                    data: this.graphData.xAxisData,
                    name: '年份', //x轴名称
                    nameTextStyle: {  //x轴名称样式
                        fontWeight: 600,
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '申请数量',
                    nameTextStyle: {  //y轴名称样式
                        fontWeight: 600,
                    }
                },
                tooltip: {
                    trigger: 'axis',
                },
                series: this.graphData.series
            },
        }
    },
    methods: {
        initChart() {
            const dom = this.$refs.warnAnalysisEchart
            this.chart = this.$echarts.init(dom)
            this.chart.setOption(this.chartOption)
            window.addEventListener('resize',this.resetChartSize)
        },
        resetChartSize() {
            this.chart.resize()
        },
    },
    mounted() {
        this.initChart()
    },
}
</script>

<style lang="scss" scoped>
.echart_contain {
    width: 400px;
    height: 400px;
}
</style>