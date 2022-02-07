<template>
    <div>
        <div class="swiper-contain" @mouseover="stop()" @mouseout="move()">
            <transition-group tag="ul" name="image">
                <li v-for="(item,index) in imgs" :key="index+'img'" v-show="index === num">
                    <img :src="item" alt="">
                </li>
            </transition-group>
            <div class="dot">
                <div v-for="(item,index) in imgs" :key="index" 
                    :class="{'active':index===num}"
                    @click="change(index)"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3186319776,669529467&fm=26&gp=0.jpg',
                'https://gss0.baidu.com/70cFfyinKgQFm2e88IuM_a/imgad/pic/item/b3fb43166d224f4a1290ba3e02f790529822d196.jpg',
            ],
            time: null,
            num: 0,
        }
    },
    methods: {
        play() {
            this.time = setInterval(() => {
                this.num++
                if(this.num === this.imgs.length) {
                    this.num = 0
                }
            },4000)
        },
        move() {
            this.play()
        },
        stop() {
            clearInterval(this.time)
        },
        change(index) {
            this.num = index
        }
    },
}
</script>

<style lang="scss" scoped>
.swiper-contain {
    position: relative;
    width: 100%;
    overflow: hidden;
    ul {
        width: 100%;
        height: 600px;
        padding: 0;
        display: flex;
        overflow: hidden;
        li {
            width: 100%;
            height: 600px;
            position: absolute;
            img {
                width: 100%;
                height: 600px;
            }
        }
    }
    
    .image-enter-active {
        transform: translateX(0);
        transition: all 1.5s ease-in-out;
    }
    .image-leave-active {
        transform: translateX(-100%);
        transition: all 1.5s ease-in-out;
    }
    .image-leave {
        transform: translateX(0);
    }
    .image-enter {
        transform: translateX(100%);
    }
    .dot {
        position: absolute; 
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        div{
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #ccc;
            margin-right: 10px;
            cursor: pointer;
        }
        .active {
            background: #fff;
        }
    }
}
</style>