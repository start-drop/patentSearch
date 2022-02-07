<template>
    <div class="rate_contain">
        <div v-for="(item,index) in icons" :key="index" class="icon_item">
            <span>{{item.name}}</span>
            <el-rate
                :max="10"
                v-model="rateNum[index]"
                disabled
                disabled-void-color="#999"
                :icon-classes="item.iconClasses"
                :disabled-void-icon-class="item.iconClass"
                :colors="colors">
            </el-rate>
        </div>
    </div>
</template>

<script>
export default{
    props: {
        rateNum: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
            colors: ['red','red','red'],
            value: 4.2,
            icons: [
                {
                    name: '心级',
                    iconClass: 'iconfont icon-xinaixin-fuben',
                    iconClasses: ['iconfont icon-xinaixin-fuben','iconfont icon-xinaixin-fuben','iconfont icon-xinaixin-fuben'],
                },
                {
                    name: '钻级',
                    iconClass: 'iconfont icon-zuanji',
                    iconClasses: ['iconfont icon-zuanji','iconfont icon-zuanji','iconfont icon-zuanji'],
                },
                {
                    name: '冠级',
                    iconClass: 'iconfont icon-huangguan-line',
                    iconClasses: ['iconfont icon-huangguan-line','iconfont icon-huangguan-line','iconfont icon-huangguan-line'],
                },
                {
                    name: '天猫',
                    iconClass: 'iconfont icon-tianmao',
                    iconClasses: ['iconfont icon-tianmao','iconfont icon-tianmao','iconfont icon-tianmao'],
                }
            ]
            
            
        }
    },
}
</script>

<style lang="scss" scoped>
.icon_item {
    display: flex;
    margin: 10px 0;
    span {
        margin-right: 10px;
    }
}
</style>