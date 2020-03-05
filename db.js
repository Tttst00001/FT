const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/node', { useNewUrlParser: true }, (err, db) => {
  if (err) {
    console.log('**********【数据库连接失败】**********')
  } else {
    console.log('**********【数据库连接成功】**********')
  }
})

// 股票列表
const basicData = new mongoose.Schema({
  ts_code: String, //TS代码
  name: String, // 股票名称
  area: String, // 所在地域
  industry: String //所属行业
},
{
  collection: 'basicData'
})

// 
const stockList = new mongoose.Schema({
  ts_code : String,
  trade_date : Number,
  close : Number,
  turnover_rate : Number,
  turnover_rate_f : Number,
  volume_ratio : Number,
  pe : Number,
  pe_ttm : Number,
  pb : Number,
  ps : Number,
  ps_ttm : Number,
  dv_ratio : Number,
  dv_ttm : Number,
  total_share : Number,
  float_share : Number,
  free_share : Number,
  total_mv : Number,
  circ_mv : Number
},
{
  collection: 'stockList'
})


// T2
const finalDay = new mongoose.Schema({
  ts_code: String, //TS代码
  name: String, // 股票名称
  area: String, // 所在地域
  industry: String, //所属行业
  daily_basic: Array,
  fina_indicator: Array,
  balancesheet: Array
},
{
  collection: 'finalDay'
})

// T3
const finalDay1912 = new mongoose.Schema({
  ts_code: String, //TS代码
  name: String, // 股票名称
  area: String, // 所在地域
  industry: String, //所属行业
  daily_basic: Array,
  fina_indicator: Array,
  balancesheet: Array
},
{
  collection: 'finalDay1912'
})

const Models = {
  BASICDATA: mongoose.model('basicData', basicData),
  FD201906: mongoose.model('finalDay', finalDay),
  FD201912: mongoose.model('finalDay1912', finalDay1912),
  STOCKLIST: mongoose.model('stockList', stockList)
  
}

module.exports = Models
