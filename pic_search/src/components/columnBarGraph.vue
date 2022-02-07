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
                title: {
                    text: ''  //图表标题
                },
                tooltip: {},
                legend: {
                    data: this.graphData.legend
                },
                xAxis: {
                    data: this.graphData.xAxisLabel,
                },
                yAxis: {},
                series: [{
                    name: this.graphData.legend[0],
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#2AA2D5',  //柱状图颜色
                        }
                    },
                    data: this.graphData.yAxisPlaceValue
                },
                {
                    name: this.graphData.legend[1],
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#ccc',  //柱状图颜色
                        }
                    },
                    data: this.graphData.yAxisAreaValue
                }]
            }
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