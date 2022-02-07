var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var app = express()
var jsonParser = bodyParser.json()
var unlencodedParser = bodyParser.urlencoded({extend: false})
app.use(jsonParser)
app.use(unlencodedParser)
const {
    AppearanceModel,
    StoreModel,
    StoreDetailModel,
    TableDataModel,
    ColumnGraphModel,
    RowGraphModel,
    MainInventorModel,
    StoreSaleAreaModel,
    AreaPieModel,
    LoginModel,
} = require('../db/models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 注册路由
router.post('/register', function(req,res) {
  // 获取请求参数
  var {username,password} = req.body
  if(username === 'admin') {
    res.send({
      code: 0,
      data: {
        username,
        password
      }
    })
  } else {
    res.send({
      code: -1,
      msg: '用户已存在'
    })
  }
})
router.get('/deleteAppearance',(req,res) => {
  const {id} = req.query
  AppearanceModel.remove({_id: id},(error,doc) => {
    if(!error) {
      if(doc.ok === 1) {
        res.send({
          code: 0,
          data: {
            msg: '删除成功'
          }
        })
      }
    } else {
      res.send({
        code: -1,
        msg: error
      })
    }
  })
})
router.get('/getAppearanceDetail',(req,res) => {
  const {id} = req.query
  AppearanceModel.findOne({_id:id},(error,doc) => {
    console.log(error,doc)
    if(!error) {
      const arr = JSON.parse(JSON.stringify(doc))
      res.send({
        code: 0,
        data: {
          list: arr
        }
      })
    } else {
      res.send({
        code: -1,
        msg: error
      })
    }
  })
})
router.post('/updateAppearance',(req,res) => {
  const {id,appearanceName,applicateNumber,inventor,applicateName,applicateDate,imgUrl} = req.body
  AppearanceModel.findOneAndUpdate({_id: id},{appearanceName,applicateNumber,inventor,applicateName,applicateDate,imgUrl},(error,olddoc) => {
    if(!error) {
      res.send({
        code: 0,
        data: {
          msg: '更新成功'
        }
      })
    }
  })
})
router.post('/saveAppearance',function(req,res) {
  const {type,appearanceName,applicateNumber,inventor,applicateName,applicateDate,imgUrl} = req.body
  const appearanceModel = new AppearanceModel({
    appearanceName,
    applicateNumber,
    inventor,
    applicateName,
    applicateDate,
    imgUrl,
  })
  appearanceModel.save(function(error,doc) {
    console.log('save',error,doc)
    if(!error) {
      res.send({
        code: 0,
        data: {
          msg: '新增成功'
        }
      })
    } else {
      res.send({
        code: -1,
        msg: '保存失败'
      })
    }
  })
})
//高级检索
router.get('/searchAppearances',(req,res) => {
  const {keyWord,abstract,sortNumber,date,inventor,proposer,address} = req.query
  const filter = {
    $or: [
      {appearanceName: {$regex: `${keyWord}`}},
      {applicateNumber: {$regex: `${sortNumber}`}},
      {applicateDate: {$regex: `${date}`}},
      {inventor: {$regex: `${inventor}`}},
      {applicateName: {$regex: `${proposer}`}},
    ]
  }
  AppearanceModel.find(filter,(error,docs) => {
    if(!error) {
      res.send({
        code: 0,
        data: {
          list: docs
        }
      })
    } else {
      res.send({
        code: -1,
        msg: error,
      })
    }
  })
})
//注册显示专利列表路由
router.get('/getAppearanceList',function(req,res) {
  const {type} = req.query
  console.log('get',type)
  let keyArrs = type.split(' ').join('|')
  console.log('arrs',keyArrs)
  AppearanceModel.find({appearanceName: {$regex:`${keyArrs}`}},function(error,docs) {
    console.log('find',error,docs,`${keyArrs}`)
    if(docs.length !== 0) {
      res.send({
        code: 0,
        data: {
          list: docs
        }
      })
    } else {
      res.send({
        code: -1,
        msg: '暂无相关专利'
      })
    }

  })
})

//注册显示商品列表路由
router.get('/getStoreList',function(req,res) {
  const {type} = req.query
  console.log('get',type)
  let keyArrs = type.split(' ').join('|')
  console.log('arrs',keyArrs)
  StoreModel.find({storeName: {$regex:`${keyArrs}`}},function(error,docs) {
    console.log('find',error,docs,`${keyArrs}`)
    if(docs.length !== 0) {
      res.send({
        code: 0,
        data: {
          list: docs
        }
      })
    } else {
      res.send({
        code: -1,
        msg: '暂无相关商品'
      })
    }

  })
})
router.post('/saveStore',function(req,res) {
  const {storeName,applicateNumber,price,paidNum,shopName,area,imgUrl} = req.body
  const storeModel = new StoreModel({
    storeName,
    price,
    paidNum,
    shopName,
    area,
    imgUrl,
  })
  storeModel.save(function(error,doc) {
    console.log('save',error,doc)
    if(!error) {
      res.send({
        code: 0,
        data: {
          doc: doc
        }
      })
    } else {
      res.send({
        code: -1,
        msg: '保存失败'
      })
    }
  })
})
function saveStore(req,res) {
  const {storeName,price,monthSales,shop,address,imgUrl} = req.body
  const storeModel = new StoreModel({
    storeName,
    price,
    paidNum:monthSales,
    shopName:shop,
    area:address,
    imgUrl,
  })
  storeModel.save(function(error,doc) {
    console.log('save',error,doc)
    if(!error) {
      res.send({
        code: 0,
        data: {
          doc: doc
        }
      })
    } else {
      res.send({
        code: -1,
        msg: '保存失败'
      })
    }
  })
}
//获取商品详情
router.post('/saveStoreDetail',(req,res) => {
  const {storeName,shop,monthSales,colorSort,comment,popularity,credit,license,description,serviceAttitude,afterSales,imgUrl} = req.body
  const storeDetailModel = new StoreDetailModel({
    storeName,shop,monthSales,colorSort,comment,popularity,credit,license,description,serviceAttitude,afterSales,imgUrl
  })
  storeDetailModel.save((error,doc) => {
    console.log(333,error,doc)
    if(!error) {
      saveStore(req,res)
      // res.send({
      //   code:0,
      //   data: {
      //     doc: doc
      //   }
      // })
    } else {
      res.send({
        code: -1,
        msg: '保存失败'
      })
    }
  })
})
router.get('/getStoreDetail',(req,res) => {
  const {id} = req.query
  StoreModel.findOne({_id:id},(error,doc) => {
    console.log(444,error,doc)
    if(doc) {
      StoreDetailModel.findOne({storeName:doc.storeName},(err,detail) => {
        console.log(555,err,detail)
        if(detail) {
          let obj = JSON.parse(JSON.stringify(detail))
          obj.price = doc.price
          obj.address = doc.area
          res.send({
            code: 0,
            data: {
              infoObj: obj
            }
          })
        } else {
          res.send({
            code: -1,
            msg: '查询失败'
          })
        }
      })
    }
  })
})
router.get('/deleteStoreDetail',(req,res) => {
  const {id,storeName} = req.query
  console.log(id,storeName)
  StoreModel.remove({_id:id},(error,doc) => {
    console.log(212,error,doc)
    if(!error) {  //doc  {n:0,ok:1,deleteCount:0}
      StoreDetailModel.remove({storeName:storeName},(error,doc) => {
        if(!error) {
          res.send({
            code: 0,
            data: {
              msg: '删除成功'
            }
          })
        }
      })
    }
  })
})
router.post('/updateStoreDetail',(req,res) => {
  const {storeName,shop,price,monthSales,address,colorSort,comment,popularity,credit,license,description,serviceAttitude,imgUrl} = req.body
  StoreModel.findOneAndUpdate({storeName:storeName},{storeName,price,paidNum:monthSales,imgUrl,shopName:shop,area:address},(error,olddoc) => {
      if(!error) {
      StoreDetailModel.findOneAndUpdate({storeName:storeName},{storeName,shop,monthSales,colorSort,comment,popularity,credit,license,description,serviceAttitude,imgUrl},(error,doc) => {
        if(!error) {
          res.send({
            code: 0,
            data: {
              msg: '更新成功'
            }
          })
        }
      })
    }
  })
})
//获取图表数据
router.post('/saveTable',(req,res) => {
  const {store,license,credit,monthSales,afterSaleRate,keyString} = req.body
  const tableDataModel = new TableDataModel({store,license,credit,monthSales,afterSaleRate,keyString})
  tableDataModel.save((error,doc) => {
    console.log(22,error,doc)
    if(!error) {
      res.send({
        code: 0,
        msg: '保存成功',
      })
    } else {
      res.send({
        code: -1,
        msg: '保存失败'
      })
    }
  })
})
router.get('/getTable',(req,res) => {
  const {key} = req.query
  TableDataModel.find({keyString: key},(error,docs) => {
    if(docs.length !== 0) {
      res.send({
        code: 0,
        data: {
          tableList: docs
        }
      })
    }
  })

})

//获取柱状图数据
router.post('/saveBarEchart',(req,res) => {
  const {xAxisLabel,yAxisPlaceValue,yAxisAreaValue,legend,key} = req.body

  const columnGraphModel = new ColumnGraphModel({key,xAxisLabel,yAxisPlaceValue,yAxisAreaValue,legend})
  columnGraphModel.save((error,doc) => {
    if(error) {
      res.send({
        code: -1,
        msg: '保存失败'
      })
    } else {
      res.send({
        code: 0,
        data: doc
      })
    }
  })
})
router.get('/getBarEchart',(req,res) => {
  const {key} = req.query
  ColumnGraphModel.find({key: key},(error,docs) => {
    if(error) {
      res.send({
        code: -1,
        msg: error,
      })
    }
    else if(docs.length !== 0) {
     res.send({
      code: 0,
      data: docs[0]
     })
    } else {
      res.send({
        code: -1,
        msg: '暂无数据'
      })
    }
  })
})

router.post('/saveRowEchart',(req,res) => {
  const {legendText,yAxisLabel,xAxisValue,key} = req.body

  const rowGraphModel = new RowGraphModel({key,legendText,yAxisLabel,xAxisValue})
  rowGraphModel.save((error,doc) => {
    if(error) {
      res.send({
        code: -1,
        msg: '保存失败'
      })
    } else {
      res.send({
        code: 0,
        data: doc
      })
    }
  })
})
router.get('/getRowEchart',(req,res) => {
  const {key} = req.query
  RowGraphModel.find({key: key},(error,docs) => {
    if(error) {
      res.send({
        code: -1,
        msg: error,
      })
    }
    else if(docs.length !== 0) {
      res.send({
        code: 0,
        data: docs[0]
      })
    } else {
      res.send({
        code: -1,
        msg: '暂无数据'
      })
    }
  })
})

//预警报告
router.post('/saveMainInventor',jsonParser,(req,res) => {
  const {keyString,series,xAxisData,legend,applicant,tend} = req.body
  console.log('-----',req.body)
  const mainInventorModel = new MainInventorModel({keyString,series,xAxisData,legend,applicant,tend})
  mainInventorModel.save((error,doc) => {
    if(error) {
      res.send({
        code: -1,
        msg: '保存失败'
      })
    } else {
      res.send({
        code: 0,
        data: doc
      })
    }
  })
})
router.get('/getMainInventor',(req,res) => {
  const {key} = req.query
  MainInventorModel.find({keyString: key},(error,docs) => {
    if(error) {
      res.send({
        code: -1,
        msg: error,
      })
    }
    else if(docs.length !== 0) {
      res.send({
        code: 0,
        data: docs[0]
      })
    } else {
      res.send({
        code: -1,
        msg: '暂无数据'
      })
    }
  })
})

router.post('/saveSaleArea',jsonParser,(req,res) => {
  const {keyString,xAxisValue,yAxisLabel,legendText,totalSales,averSales,tend} = req.body
  console.log('-----',req.body)
  const storeSaleAreaModel = new StoreSaleAreaModel({keyString,yAxisLabel,xAxisValue,legendText,totalSales,averSales,tend})
  storeSaleAreaModel.save((error,doc) => {
    if(error) {
      res.send({
        code: -1,
        msg: '保存失败'
      })
    } else {
      res.send({
        code: 0,
        data: doc
      })
    }
  })
})
router.get('/getSaleArea',(req,res) => {
  const {key} = req.query
  StoreSaleAreaModel.find({keyString: key},(error,docs) => {
    if(error) {
      res.send({
        code: -1,
        msg: error,
      })
    }
    else if(docs.length !== 0) {
      res.send({
        code: 0,
        data: docs[0]
      })
    } else {
      res.send({
        code: -1,
        msg: '暂无数据'
      })
    }
  })
})


router.post('/savePieArea',jsonParser,(req,res) => {
  const {keyString,baseObj,barObj,pieObj,rateObj} = req.body
  console.log('-----',req.body)
  const areaPieModel = new AreaPieModel({keyString,baseObj,barObj,pieObj,rateObj})
  areaPieModel.save((error,doc) => {
    if(error) {
      res.send({
        code: -1,
        msg: '保存失败'
      })
    } else {
      res.send({
        code: 0,
        data: doc
      })
    }
  })
})
router.get('/getPieArea',(req,res) => {
  const {key} = req.query
  AreaPieModel.find({keyString: key},(error,docs) => {
    if(error) {
      res.send({
        code: -1,
        msg: error,
      })
    }
    else if(docs.length !== 0) {
      res.send({
        code: 0,
        data: docs[0]
      })
    } else {
      res.send({
        code: -1,
        msg: '暂无数据'
      })
    }
  })
})

router.post('/registerLogin',(req,res) => {
  const {userName,password} = req.body
  LoginModel.findOne({userName:userName},(error,doc) => {
    if(!error) {
      if(doc) {
        res.send({
          code: -1,
          msg: '用户已存在'
        })
      } else {
        const loginModel = new LoginModel({userName,password})
        loginModel.save((error,doc) => {
          if(error) {
            res.send({
              code: -1,
              msg: '注册失败',
            })
          } else {
            if(doc) {
              res.send({
                code: 0,
                data: {
                  msg: '注册成功',
                }
              })
            }
          }
        })
      }
    }
  })

})
router.get('/checkLogin',(req,res) => {
  const {userName,password} = req.query
  LoginModel.findOne({userName: userName,password: password},(error,doc) => {
    if(!error) {
      if(!doc) {
        res.send({
          code: -1,
          msg: '输入有误，请重新输入',
        })
      } else {
        res.cookie('userId',doc._id)
        res.send({
          code: 0,
          data: {
            msg: '登录成功',
            isManagement: 1,
          }
        })
      }
    }
  })
})

module.exports = router;


