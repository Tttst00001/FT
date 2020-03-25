const express = require("express");
const app = express();
const Models = require("./db");
const CommonFn = require('./utils/callback.js')
const loopData = require('./utils/callback_01.js')
const HTTP = require('./utils/http.js')
const RD = require('./utils/resdata.js')
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
    Models.FD201906.find({$or:[{ts_code: req.body.code}]}).then(Response => {
      let nn = loopData(Response, 0)
      res.send({
        state: 200,
        data: nn
      })
    })
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
app.post('/moneyflow', function (req, response) {
  new Promise((reslove, reject) => {
    let moneyflow = {
      interface: 'moneyflow',
      data: req.body
    }

    let daily_basic = {
      interface: 'daily_basic',
      data: req.body
    }

    Promise.all([HTTP(moneyflow), HTTP(daily_basic)]).then(res => {
      let _daily_basic = RD(res[1])
      let _moneyflow = RD(res[0])
      let obj = {
        _daily_basic,
        _moneyflow
      }
      reslove(obj)
    })
    
  }).then(res => {
    console.log(res)
    let cbData = {
      close: [],
      pe: [],
      pe_ttm: [],
      pb: [],
      ps: [],
      ps_ttm: [],
      dv_ratio: [],   
      turnover_rate: [],
      trade_date: [],
      buy_sm_amount: [],
      sell_sm_amount: [],
      buy_md_amount: [],
      sell_md_amount: [],
      buy_lg_amount: [],
      sell_lg_amount: [],
      buy_elg_amount: [],
      sell_elg_amount: [],
      net_mf_amount: []
    }
    let db = res._daily_basic;
    let mf = res._moneyflow;

    for (let i = 0; i < db.length; i++) {
      cbData.trade_date.unshift(db[i].trade_date)
      cbData.close.unshift(db[i].close)
      cbData.pe.unshift(db[i].pe)
      cbData.pe_ttm.unshift(db[i].pe_ttm)
      cbData.pb.unshift(db[i].pb)
      cbData.ps.unshift(db[i].ps)
      cbData.ps_ttm.unshift(db[i].ps_ttm)
      cbData.dv_ratio.unshift(db[i].dv_ratio)
      cbData.turnover_rate.unshift(db[i].turnover_rate)
      cbData.buy_sm_amount.unshift(mf[i].buy_sm_amount)
      cbData.sell_sm_amount.unshift(mf[i].sell_sm_amount)
      cbData.buy_md_amount.unshift(mf[i].buy_md_amount)
      cbData.sell_md_amount.unshift(mf[i].sell_md_amount)
      cbData.buy_lg_amount.unshift(mf[i].buy_lg_amount)
      cbData.sell_lg_amount.unshift(mf[i].sell_lg_amount)
      cbData.buy_elg_amount.unshift(mf[i].buy_elg_amount)
      cbData.sell_elg_amount.unshift(mf[i].sell_elg_amount)
      cbData.net_mf_amount.unshift(mf[i].net_mf_amount)
    }

    response.send({
      state: 200,
      data: cbData
    })
  })
})



app.listen(5000, () => console.log('**********【服务器启动成功】**********'));
