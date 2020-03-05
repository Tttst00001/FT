const express = require("express");
const app = express();
const ResData = require('./utils/callback.js')
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
  let xhr = new Promise((reslove, reject) => {
    var mmm = ResData(req.body.code)
    console.log(mmm)
    reslove(mmm)
  }).then(cb => {
    console.log('cb', cb)
    res.send({
      state: 200,
      data: cb
    })
  })


  // let resData = ResData(req.body.code)
  // console.log(6, )
  
})


app.listen(5000, () => console.log('**********【服务器启动成功】**********'));
