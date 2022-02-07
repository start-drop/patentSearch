// 1、连接数据库
// 1.1、引入mongoose
const mongoose = require('mongoose')
// 1.2、连接指定数据库
mongoose.connect('mongodb://localhost:27017/test')
// 1.3、获取连接对象
const conn = mongoose.connection
// 1.4、绑定连接完成的监听（用来提示连接成功）
conn.on('connected',function() {
    console.log('数据库连接成功')
})
// 2、得到对应特定集合的model
// 2.1、定义schema（描述文档结构）
const userSchema = mongoose.Schema({
    username: {type: String,require: true},
    password: {type: String,require: true}
})
// 2.2、定义model（与集合对应，可操作集合）
const UserModel = mongoose.model('user',userSchema)  //集合的名称为：users

// 3、通过Model或其实例对集合数据进行crud操作
// 3.1、通过Model实例的save添加数据
function testSave() {
    // 创建UserModel实例
    const userModel = new UserModel({username: 'pm',password: '789'})
    userModel.save(function(error,user) {
        console.log('save',error,user)
    })
}
// testSave()

// 3.2、通过Model的find()/fineOne()查询多个或一个数据
function testFind() {
    // 如果没有一个匹配，返回[]
    UserModel.find({_id:'603bb4f60cbd0235e40b586f'},function(error,users){
        console.log('find()',error,users)
    })
    // 如果没有一个匹配，返回null
    UserModel.findOne({_id:'603bb4f60cbd0235e40b586f'},function(error,user) {
        console.log('findOne()',error,user)
    })
}
// testFind()

// 3.3、通过Model的findByIdAndUpdate()更新某个数据
function testUpdate() {
    UserModel.findByIdAndUpdate({_id:'603bb4f60cbd0235e40b586f'},{username: 'allday'},function(error,oldUser) {
        console.log('update()',error,user)
    })
}
// testUpdate()

// 3.4、通过Model的remove()删除匹配的数据
function testDelete(){
    UserModel.remove({_id:'603bb4f60cbd0235e40b586f'},function(error,user){
        console.log('remove()',user)
    })
}
testDelete()