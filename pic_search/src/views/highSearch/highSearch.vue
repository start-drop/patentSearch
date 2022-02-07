<template>
    <div>
        <HeadNav @jump="handleJump" @connect="handleJump"></HeadNav>
        <div class="content">
            <div class="right_adv">
                <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1807859657,39971296&fm=26&gp=0.jpg" alt="">
            </div>
            <div class="search_contain">
                <h3>高级搜索</h3>
                <div class="search_item" v-for="(item,index) in searchData" :key="index">
                    <div>
                        <span class="label">{{item.label}}</span>
                        <input v-if="item.type === 'text'" type="text" v-model="item.value[0]" :placeholder="item.placeholder">
                        <el-date-picker
                            v-else
                            v-model="item.value[0]"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <span class="el-icon-circle-plus" @click="modifyInputNum(index,1)"></span>
                    </div>
                    <div v-for="(iitem,iindex) in item.num" :key="iindex">
                        <span class="label"></span>
                        <input v-if="item.type === 'text'" type="text" 
                            :placeholder="item.placeholder"
                            v-model="item.value[iindex+1]">
                        <el-date-picker
                            v-else
                            v-model="item.value[iindex+1]"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <span class="el-icon-remove" @click="modifyInputNum(index,-1)"></span>
                    </div>
                </div>
                <div class="btn_group">
                    <el-button type="primary" @click="searchResult">检索</el-button>
                    <el-button type="info" @click="clearAll">清除</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeadNav from '../../components/HeadNav'
export default {
    name: 'highSearch',
    data() {
        return {
            searchData: [
                {label: '关键词',value: [''],type: 'text',placeholder: '标题', num: 1},
                {label: '摘要',value: [''],type: 'text',placeholder: '摘要', num: 2},
                {label: '分类号',value: [''],type: 'text',placeholder: 'IPC(国际分类)', num: 0},
                {label: '日期',value: [''],type: 'date',placeholder: '日期', num: 0},
                {label: '发明人',value: [''],type: 'text',placeholder: '发明人', num: 0},
                {label: '申请人',value: [''],type: 'text',placeholder: '申请人', num: 0},
                {label: '申请人地址',value: [''],type: 'text',placeholder: '申请人地址', num: 0},
            ]
        }
    },
    methods: {
        modifyInputNum(index,number) {
            console.log(index,number)
            this.searchData[index].num += number
        },
        searchResult() {
            let searchObj = {
                keyWord: this.searchData[0].value.join('|'),
                abstract: this.searchData[1].value.join('|'),
                sortNumber: this.searchData[2].value.join('|'),
                date: this.searchData[3].value.join('|'),
                inventor: this.searchData[4].value.join('|'),
                proposer: this.searchData[5].value.join('|'),
                address: this.searchData[6].value.join('|')
            }

            this.$router.push({
                path: '/searchRes',
                query: {
                    searchObj: searchObj,
                }
            })
            
        },
        clearAll() {
            let arrs = this.searchData.map(item => {
                item.value = ['']
                return item
            })
            this.searchData = JSON.parse(JSON.stringify(arrs))
            console.log('c',this.searchData)
        },
        // 跳转到首页
        handleJump() {
            this.$router.push('/')
        },

    },
    components: {
        HeadNav
    }
}
</script>

<style lang="scss" scoped>
.content {
    width: 80%;
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    margin-bottom: 20px;
    .right_adv {
        margin-right: 10px;
        flex: 4;
        height: 660px;
        border: 1px solid #DCDFE6;
        box-shadow: 0px 2px 8px rgba(0,0,0,.1);
        img {
            width: 100%;
            height: 100%;
        }
    }
    .search_contain {
        flex: 8;
        background: #fff;
        border: 1px solid #ddd;
        box-shadow: 0px 2px 4px rgba(0,0,0,.1);
        padding: 10px;
        height: 660px;
        box-sizing: border-box;
        .search_item div {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
            .label {
                width: 100px;
                font-size: 16px;
                color: #333;
            }
            input {
                width: 220px;
                height: 40px;
                box-sizing: border-box;
                border: 1px solid #DCDFE6;
                border-radius: 4px;
                color: #606266;
                padding: 1px 10px;
                outline: none;
            }
            input:focus {
                border-color: #409EFF;
            }
            input::placeholder {
                color: #c0c4cc;
            }
            .el-icon-circle-plus,
            .el-icon-remove {
                color: #409EFF;
                margin-left: 20px;
            }
        }
        .btn_group {
            text-align: center;
            margin-top: 20px;
            .el-button {
                padding: 10px 20px;
            }
        }
    }
}

</style>
