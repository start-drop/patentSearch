// 1、连接数据库
// 1.1、引入mongoose
const mongoose = require('mongoose')
// 1.2、连接指定数据库
mongoose.connect('mongodb://localhost:27017/finalDesign',{
    useNewUrlParser: true
})
    .then(() => console.log("Connection Successful"))
    .catch(err => console.log(err))
// 1.3、获取连接对象
const conn = mongoose.connection
// 1.4、绑定连接完成的监听（用来提示连接成功）
conn.on('connected',() => {
    console.log('appearance success!!')
})

// 2、得到对应特定集合的专利model
// 2.1、定义schema（描述文档结构）
const appearanceSchema = mongoose.Schema({
    type: {type: String,require: true},
    appearanceName: {type: String},
    applicateNumber: {type: String},
    inventor: {type: String},
    applicateName: {type: String},
    applicateDate: {type: String},
    imgUrl: String
})
// 2.2、定义model（与集合对应，可操作集合）
const AppearanceModel = mongoose.model('appearance',appearanceSchema)
exports.AppearanceModel = AppearanceModel

//3、得到对应特定集合的商品model
const storeSchema = mongoose.Schema({
    storeName: {type: String},
    price: {type: Number},
    paidNum: {type: Number},
    shopName: {type: String},
    area: {type: String},
    imgUrl: String,
})
const StoreModel = mongoose.model('store',storeSchema)
exports.StoreModel = StoreModel

//4、得到对应特定集合的商品详情model
const storeDetailSchema = mongoose.Schema({
    storeName: String,
    shop: String,
    monthSales: Number,
    colorSort: String,
    comment: Number,
    popularity: Number,
    credit: String,
    license: String,
    description: String,
    serviceAttitude: String,
    afterSales: String,
    imgUrl: String,
})
const StoreDetailModel = mongoose.model('storeDetail',storeDetailSchema)
exports.StoreDetailModel = StoreDetailModel

//5、得到对应特定集合的纵柱状图model
const columnGraphSchema = mongoose.Schema({
    key: {
        type: String,
        require: true
    },
    xAxisLabel: {
        type: String,
    },
    yAxisPlaceValue: {
        type: String,
    },
    yAxisAreaValue: {
        type: String,
    },
    legend: {
        type: String,
    }
})
const ColumnGraphModel = mongoose.model('columnGraph',columnGraphSchema)
exports.ColumnGraphModel = ColumnGraphModel

const rowGraphSchema = mongoose.Schema({
    legendText: {
        type: String,
    },
    yAxisLabel: {
        type: String,
    },
    xAxisValue: {
        type: String,
    },
    key: String,
})
const RowGraphModel = mongoose.model('rowGraph',rowGraphSchema)
exports.RowGraphModel = RowGraphModel

const tableDataSchema = mongoose.Schema({
    store: String,
    license: String,
    credit: String,
    monthSales: Number,
    afterSaleRate: String,
    keyString: String,
})
const TableDataModel = mongoose.model('tableData',tableDataSchema)
exports.TableDataModel = TableDataModel

const mainInventorSchema = mongoose.Schema({
    keyString: String,
    xAxisData: Array,
    series: Array,
    legend: Array,
    applicant: Array,
    tend: String,
})
const MainInventorModel = mongoose.model('mainInventorSchema',mainInventorSchema)
exports.MainInventorModel = MainInventorModel

const storeSaleAreaSchema = mongoose.Schema({
    legendText: String,
    yAxisLabel: Array,
    xAxisValue: Array,
    keyString: String,
    tend: String,
    totalSales: Number,
    averSales: Number,
})
const StoreSaleAreaModel = mongoose.model('storeSaleArea',storeSaleAreaSchema)
exports.StoreSaleAreaModel = StoreSaleAreaModel

const AreaPieSchema = mongoose.Schema({
    rateObj: Object,
    pieObj: Object,
    barObj: Object,
    baseObj: Object,
    keyString: String
})
const AreaPieModel = mongoose.model('areaPie',AreaPieSchema)
exports.AreaPieModel = AreaPieModel

//登录
const loginSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }
})
const LoginModel = mongoose.model('login',loginSchema)
exports.LoginModel = LoginModel


