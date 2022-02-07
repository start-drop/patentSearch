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
                color:['#3398DB'],   //条形柱颜色
                title: {
                    text: '',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: [this.graphData.legendText], 
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: this.graphData.yAxisLabel,	
                },
                series: [
                    {
                        name: this.graphData.legendText, 	
                        barWidth: 30,		//设置柱子宽度
                        type: 'bar',
                        data: this.graphData.xAxisValue, 
                    }
				]
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