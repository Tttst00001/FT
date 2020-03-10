const express = require("express");
const app = express();
const Models = require("./db");
const CommonFn = require('./utils/callback.js')
const loopData = require('./utils/callback_01.js')
var bodyParser = require('body-parser');
app.use(bodyParser.json({'limit':'10240kb'}))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})



// 获取板块
app.post('/stock', function (req, res) {
  if (req.body.code != '') {
    // Models.FD201906.find({$or:[{ts_code: req.body.code}]}).then(Response => {
    //   let nn = CommonFn.loopData(Response)
    //   res.send({
    //     state: 200,
    //     data: nn
    //   })
    // })
  } else {
    Models.FD201906.find((err, items) => {
      let nn = loopData(items)
      console.log('nn', nn)
      res.send({
        state: 200,
        data: nn
      })
    })
  }
})

// 获取资金流向
app.post('/moneyflow', function (req, res) {
  Models.MONEYFLOW.find((err, items) => {
    let data = CommonFn.callback_mf(items)
    res.send({
      state: 200,
      data: data
    })
  }).limit(50)
})



app.listen(5000, () => console.log('**********【服务器启动成功】**********'));
