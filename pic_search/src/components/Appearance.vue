<template>
<div class="shops">
    <!-- 外观专利列表 -->
    <div v-if="name === 'appearancePatent'">
        <Table :headData="appliHeadData" :tableData="appearData"></Table>
    </div>
    <!-- 平台商品列表 -->
    <div v-else-if="name === 'platformGoods'">
        <Table :headData="shopHeadData" :tableData="shopData"></Table>
    </div>
    
    <page :pageData="pageSetting" @change="handleChangePageSet"></page>
</div> 
</template>

<script>
import page from '../components/page'
import Table from '../components/Table'
import {getAppearanceList,getStoreList,deleteSingleStore,deleteSingleAppearance,searchAppearances} from '../api/index';
    export default {
        props: {
            name: {
                type: String,
                require: true,
            },
            filter: {
                type: Object,
            }
        },
        data() {
            return {
                pageSetting: {
                    totalNum: 10,
                    currentPage: 1,
                    pageSize: 10,
                },
                appearData: [],
                shopData: [],
                shopHeadData: {
                    right: [
                        {label: '商品名称', key: 'storeName',width: '160px'},
                        {label: '价格(元)', key: 'price',width: '100px'},
                        {label: '月销售量', key: 'paidNum',width: '100px'},
                        {label: '卖家店名', key: 'shopName',width: '120px'},
                        {label: '卖家地址', key: 'area',width: '160px'},
                    ],
                    left: {
                        handleToDetail: (row) => {
                            this.$router.push({
                                path: '/shopDetail',
                                query: {
                                    key: row._id
                                }
                            })
                        },
                        handleEditItem: (row) => {
                            this.$router.push({
                                path: '/shop/edit',
                                query: {
                                    id: row._id,
                                }
                            })
                        },
                        handleDelete:(row) => {
                            this.$alert('确认删除该商品？', '', {
                                confirmButtonText: '确定',
                                showCancelButton: true,
                                callback: action => {
                                    console.log(action)
                                    if(action === 'confirm') {
                                        deleteSingleStore({id:row._id,storeName:row.storeName}).then(res => {
                                            if(res.data.code === 0) {
                                                this.$message('删除成功')
                                                this.initList()
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                },
                    
                appliHeadData: {
                    right: [
                        {label: '专利名',key: 'appearanceName',width: '160px'},
                        {label: '申请号',key: 'applicateNumber',width: '160px'},
                        {label: '发明人',key: 'inventor',width: '100px'},
                        {label: '申请人',key: 'applicateName',width: '100px'},
                        {label: '申请日期',key: 'applicateDate',width: '130px'},
                    ],
                    left: {
                        handleToDetail: (row) => {
                            this.gotoDetail(row)
                        },
                        handleEditItem: (row) => {
                            this.$router.push({
                                path: '/appearance/edit',
                                query: {
                                    id: row._id
                                }
                            })
                        },
                        handleDelete: (row) => {
                            this.$alert('确认删除该专利？', '', {
                                confirmButtonText: '确定',
                                showCancelButton: true,
                                callback: action => {
                                    console.log(action)
                                    if(action === 'confirm') {
                                        deleteSingleAppearance(row._id).then(res => {
                                            if(res.data.code === 0) {
                                                this.$message(res.data.data.msg)
                                            }
                                        })
                                    } else {

                                    }
                                }
                            })
                        }
                    }
                },
            }
        },
        methods: {
            gotoDetail(row) {
                this.$store.commit('setPicPath',row.imgUrl)
                this.$router.push({
                    path: '/detail',
                    query: {
                        key: row.appearanceName,
                        picPath: row.imgUrl

                    }
                })
            },
            // 进入商品详情页
            gotoShopDetail(e,key) {
                let dom = document.getElementById('simalarWarn')
                if(!dom.contains(e.target)) {
                    this.$router.push({
                        path: '/shopDetail',
                        query: {
                            key: key
                        }
                    })
                }
            },
            handleChangePageSet(curPage,pageSize) {
                console.log(curPage,pageSize)
                this.pageSetting.currentPage = curPage
                this.pageSetting.pageSize = pageSize
            },
            initList() {
                //简单搜索
                console.log(222,this.$route.query.searchObj)
                const searchObj = this.$route.query.searchObj
                if(!searchObj){
                    console.log('simple',this.$store.state.keyWords)
                    let str = ''
                    if(this.$store.state.keyWords !== null && this.$store.state.keyWords.length !== 0) {
                        str = this.$store.state.keyWords.join(' ')
                    }
                    getAppearanceList(str).then(res => {
                        const resData = res.data
                        if(resData.code === 0) {
                            this.appearData = resData.data.list
                            this.pageSetting.totalNum = this.appearData.length
                        }
                        else {
                            this.appearData = []
                        }
                        getStoreList(str).then(res => {
                            const resData1 = res.data
                            if(resData1.code === 0) {
                                this.shopData = resData1.data.list
                            }
                            else {
                                this.shopData = []
                            }
                        })
                    })
                }
                //高级搜索
                
                else {
                    console.log('high')
                    searchAppearances(searchObj).then(res => {
                        if(res.data.code === 0) {
                            this.appearData = res.data.data.list
                        
                        }
                    }) 
                }
            },
        },
        mounted() {
            this.initList()
        },
        components: {
            page,
            Table,
        }
    }
</script>

<style lang="scss" scoped>
.shops {
    .shop_item {
        padding: 10px 0;
        height: 130px;
        box-sizing: border-box;
        font-size: 14px;
        display: flex;
        color: rgba(0,0,0,0.65);
        border-bottom: 4px solid #f2f2f2;
        
        p {
            width: 500px;
            color: rgba(0,0,0,.9);
            font-size: 20px;
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .shop_right_content {
            width: 500px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .shop_name {
                font-size: 20px;
                color: #000;
                font-weight: 550;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .shop_middle {
                display: flex;
                align-items: center;
                font-size: 14px;
                .shop_price {
                    font-size: 18px;
                    color: #fd3f31;
                }
                .paid_num {
                    margin: 0 10px;
                }
            }
            .shop_resource {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .simalar_warn {
                    display: flex;
                    align-items: center;
                    color: #333;
                    font-size: 16px;
                    p {
                        width: auto;
                        color: rgba(0,0,0,.65);
                        font-weight: 550;
                        font-size: 16px;
                        margin-right: 10px;
                    }
                    i {
                        margin-top: 2px;
                    }
                }
                .simalar_warn:hover,
                .simalar_warn p:hover{
                    color: rgb(62, 62, 235);
                }
            }
        }
    }
    .no_result_info {
        display: flex;
        justify-content: center;
        img {
            width: 400px;
            height: 600px;
        }
    }
    .el-pagination {
        margin-top: 10px;
    }
}
</style>