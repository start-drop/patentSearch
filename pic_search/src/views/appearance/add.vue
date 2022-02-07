<template>
    <div class="add_contain">
        <div class="title">新增</div>
        <div class="add_group">
            <div class="add_item" v-for="(item,index) in addHeadData" :key="index">
                <div class="add_label">{{item.name}}</div>
                <el-date-picker 
                    v-if="item.type === 'date'" 
                    type="date"
                    v-model="formData.applicateDate"
                    value-format="yyyy-MM-dd"
                    placeholder="选择申请日期"></el-date-picker>
                <div class="upload" v-else-if="item.key === 'imgUrl'">
                    <input type="file" style="opacity:0;width:56px;height:32px;position:absolute;top:0;left:0;" @change="getUploadImg">
                    <el-button size="small">上传</el-button>
                    <div class="tip">支持jpg/jpeg/png图片</div>
                    <div class="img_contain" v-if="formData.imgUrl!==''">
                        <img :src="formData.imgUrl" alt="">
                        <span class="el-icon-error" @click="clearImgUrl"></span>
                    </div>
                </div>
                <el-input v-else v-model="formData[item.key]"></el-input>
            </div>
        </div>
        <BtnGroup @confirm="handleConfirm" @cancel="handleCancel"></BtnGroup>
    </div>
</template>

<script>
import BtnGroup from '../../components/BtnGroup'
import {addSingleAppearance} from '../../api/index'
export default {
    data() {
        return {
            addHeadData: [
                {name: '专利名称',key: 'appearanceName'},
                {name: '专利图片', key: 'imgUrl'},
                {name: '申请号', key: 'applicateNumber'},
                {name: '发明人',key: 'inventor'},
                {name: '申请人',key: 'applicateName'},
                {name: '申请日期',key: 'applicateDate',type: 'date'},
                // {name: '颜色分类',key: 'colorSort'},
                // {name: '累计评价',key: 'comment'},
                // {name: '人气',key: 'popularity'},
                // {name: '信誉',key: 'credit'},
                // {name: '工商执照',key: 'license'},
                // {name: '描述相符',key: 'description'},
                // {name: '服务态度',key: 'serviceAttitude'},
            ],
            formData: {
                imgUrl: '',
            },
        }
    },
    methods: {
        handleConfirm() {
            const obj = {
                appearanceName: this.formData.appearanceName,
                imgUrl: this.formData.imgUrl,
                applicateNumber: this.formData.applicateNumber,
                inventor: this.formData.inventor,
                applicateName: this.formData.applicateName,
                applicateDate: this.formData.applicateDate,
            }
            addSingleAppearance(obj).then(res => {
                if(res.data.code === 0) {
                    this.$alert(res.data.data.msg,'',{
                        confirmButtonText: '确定'
                    })
                }
            })
        },
        handleCancel() {
            this.$router.back()
        },
        getUploadImg(e) {
            const file = e.target.files[0]
            //转码base64
            let reader = new FileReader();
            reader.readAsDataURL(file)
            let imgFile
            reader.onload = e => {
                imgFile = e.target.result
                let arr = imgFile.split(',')
                this.formData.imgUrl = 'data:image.png;base64,' + arr[1]
            }
            e.target.value = ''  //上传第二次不能选择同一文件,change监听的为input的value值
        },
        clearImgUrl() {
            this.formData.imgUrl = ''
        }
    },
    components: {
        BtnGroup,
    }
}
</script>

<style lang="scss" scoped>
.add_contain {
    padding: 100px;
    .title {
        font-weight: 700;
        padding-left: 20px;
        color: #666;
        font-size: 16px;
        background-color: #f5f5f5;
        border-left: 4px solid #64a8e9;
        height: 47px;
        line-height: 47px;
        margin-bottom: 20px;
    }
    .add_group {
        .add_item {
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            .add_label {
                width: 140px;
                text-align: right;
                margin-right: 30px;
                color: #333;
                font-size: 14px;
            }
            .el-input {
                width: 300px;
            }
            .upload {
                position: relative;
                .tip {
                    margin-top: 6px;
                    font-size: 12px;
                    color: #999;
                }
            }
            .img_contain {
                margin-top: 10px;
                position: relative;
                img {
                    width: 50px;
                    height: 50px;
                }
                span {
                    color: #999;
                    position: absolute;
                    top: -8px;
                    left: 42px;
                }
                span:hover {
                    color: #64a8e9;
                }
            }
        }
    }
}
</style>
