<template>
    <div class="header">
        <div v-if="$store.state.picPath || showDesc" class="head_com">
            <img 
                v-if="$store.state.picPath || headData.picPath" 
                :src="$store.state.picPath || headData.picPath" alt="">
            <img v-else src="../images/img.jpg" alt="">
            <p v-if="showDesc">图中是&emsp;{{headData.shopName}}</p>
            <div class="constructor" v-else>
                <p class="right_title">识别结果</p>
                <div class="res_item" v-for="(item,index) in $store.state.keyObj" :key="index">
                    <p>{{item.keyword}}</p>
                    <div class="progress">
                        <div class="line" :style="{width: item.score*150 +'px'}"></div>
                        <span>{{item.score.toFixed(3)}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="head_com" title="可点击上传图片进行搜索">
            <div class="add_pic" @mouseenter="showTip">
                <input type="file" accept="image/jpeg, image/jpg, image/png, image/bmp"
                    @change="uploadPic">
                <i class="el-icon-plus"></i>
            </div>
            <p v-if="inputValue===''">当前无图片，请点击上传图片</p>
            <p v-else>当前搜索的内容是&emsp;{{inputValue}}</p>
        </div>
    </div>
</template>

<script>
import {accordToPicGetKey,getAccessToken} from '../api/index'
export default {
    data() {
        return {
            init: '@/images/img.jpg'
        }
    },
    props: {
        headData: {
            type: Object,
            default: function() {
                return {}
            }
        },
        showDesc: {
            type: Boolean,
            default: function() {
                return false
            },
        },
        inputValue: {
            type: String
        },
    },
    methods: {
        uploadPic(event) {
            //转码base64
            let reader = new FileReader();
            reader.readAsDataURL(event.srcElement.files[0])
            let imgFile
            reader.onload = e => {
                imgFile = e.target.result
                let arr = imgFile.split(',')
                this.$store.commit('setPicPath', 'data:image.png;base64,' + arr[1])
                accordToPicGetKey(arr[1]).then(res => {
                    if(res.data.error_code === 111) {
                        console.log('token无效')
                        getAccessToken().then(res => {
                            const accessToken = res.data.access_token
                            localStorage.setItem('AccessToken',accessToken)
                            this.uploadPic()
                        })
                    }
                    else {
                        console.log('result',res.data.result)
                        this.$store.commit('setKeyObj',res.data.result)
                        var arrs = []
                        res.data.result.forEach((item,index) => {
                          arrs[index] = item.keyword
                        })
                        console.log('keyArr',this.$store.state.keyWords)
                        this.$store.commit('setKeyWords',arrs)
                        this.$emit('upload')
                    }
                })
            }
        },
        showTip() {

        },
    },
}
</script>

<style lang="scss" scoped>
    .head_com {
        background: #666;
        color: #fff;
        display: flex;
        align-items: center;
        .right_title {
            margin-bottom: 14px;
        }
        .res_item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            p {
                width: 140px;
                font-size: 14px;
            }
            .progress {
                width: 200px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span {
                    font-size: 14px;
                }
            }
        }
        img, .add_pic{
            width: 160px;
            height: 160px;
            background: #fff;
            margin-right: 30px;
        }
        .add_pic {
            border: 1px dashed #c0ccda;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .el-icon-plus {
                color:#8c939d;
                font-size: 40px;
            }
            input {
                width: 160px;
                height: 160px;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
            }
        }
    } 

.line {
    background: #fff;
    height: 5px;
}
</style>