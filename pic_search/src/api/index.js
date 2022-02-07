import axios from 'axios'

export function searchByWord(data) {
    return axios({
        url: '',
        method: 'GET',
        asnyc: false,
        params: {
            key: data
        }
    })
}

// 获取access_token
export function getAccessToken() {
    const clientId = 'Q6KP4qfxCxGk07dU6DALuRkU'
    const clientSecret = 'WSDtWlqed3CW9gK3TtA2T77RFsj9mALh'
    return axios({
        url: `/api/oauth/2.0/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        method: 'POST'
    })
}

//传入图片，输入图片中的多个物体及场景标签
export function accordToPicGetKey(img) {
    var form = new FormData();
      // 文件对象
    form.append("image", img);
    form.append("access_token", localStorage.getItem('AccessToken'));

    return axios.post('/api/rest/2.0/image-classify/v2/advanced_general',form,
        {  headers:{  dataType:'json',
                    contentType:'application/x-www-form-urlencoded',
        }})
}
//删除单个专利
export function deleteSingleAppearance(id) {
    return axios({
        url: '/user/deleteAppearance',
        method: 'GET',
        params: {
            id
        }
    })
}
//获取专利详情
export function getSingleAppearance(id) {
    return axios({
        url: '/user/getAppearanceDetail',
        method: 'GET',
        params: {
            id
        }
    })
}
//更新专利
export function updateSingleAppearance(obj) {
    return axios({
        url: '/user/updateAppearance',
        method: 'POST',
        data: obj
    })
}
//新增专利
export function addSingleAppearance(obj) {
    return axios({
        url: '/user/saveAppearance',
        method: 'POST',
        data: obj
    })
}
//高级搜索
export function searchAppearances(obj) {
    return axios({
        url: '/user/searchAppearances',
        method: 'GET',
        params: obj
    })
}
//获取专利列表
export function getAppearanceList(keys) {
    return axios({
        url: '/user/getAppearanceList',
        method: 'GET',
        params: {
            type: keys,
        }
    })
}
//获取商品列表
export function getStoreList(keys) {
    return axios({
        url: '/user/getStoreList',
        method: 'GET',
        params: {
            type: keys
        }
    })
}
//获取商品列表详情
export function getStoreDetail(id) {
    return axios({
        url: '/user/getStoreDetail',
        method: 'GET',
        params: {
            id: id
        }
    })
}
//新增商品信息
export function addShopDetail(data) {
    return axios({
        url: '/user/saveStoreDetail',
        method: 'POST',
        data: data
    })
}
//删除商品信息
export function deleteSingleStore(data) {
    console.log(data)
    return axios({
        url: '/user/deleteStoreDetail',
        method: 'GET',
        params: data
    })
}
//更新商品信息
export function updateSingleStore(data) {
    return axios({
        url:'/user/updateStoreDetail',
        method: 'POST',
        data: data
    })
}
//预警分析
//获取表格数据
export function getTableData(key) {
    return axios({
        url: '/user/getTable',
        method: 'GET',
        params: {
            key: key
        }
    })
}

//获取纵向柱状图数据
export function getColumnData(key){
    return axios({
        url: '/user/getBarEchart',
        method: 'GET',
        params: {
            key: key
        }
    })
}

//获取横向柱状图数据
export function getRowData(key){
    return axios({
        url: '/user/getRowEchart',
        method: 'GET',
        params: {
            key: key
        }
    })
}

//获取发明人专利数量
export function getMainInventor(key) {
    return axios({
        url: '/user/getMainInventor',
        method: 'GET',
        params: {
            key: key
        }
    })
}

//获取商品销售分布数量
export function getSaleArea(key) {
    return axios({
        url: '/user/getSaleArea',
        method: 'GET',
        params: {
            key: key
        }
    })
}

//获取商品分布和产地分布数据
export function getBaseArea(key) {
    return axios({
        url: '/user/getPieArea',
        method: 'GET',
        params: {
            key: key
        }
    })
}
//登录
export function managerLogin(data) {
    return axios({
        url: '/user/checkLogin',
        method: 'GET',
        params: data
    })
}






