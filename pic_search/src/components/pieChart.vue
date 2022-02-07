<template>
    <div ref="warnAnalysisEchart" class="echart_contain"></div>
</template>

<script>
export default {
    props: {
        graphData: {
            type: Array,
            require: true,
        }
    },
    data() {
        return {
            chartOption: {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {d}%"
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: ['专利分布']
                },
                series: [
                    {
                        name: '专利分布',
                        type: 'pie',    // 设置图表类型为饼图
                        radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                        roseType: 'angle', //显示成南丁格尔图
                        data: this.graphData
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