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
  industry: String, //所属行业
  list_date: String // 上市日期
},
{
  collection: 'basicData'
})

// 主营业务
const finaMainbz = new mongoose.Schema({
	ts_code: String, //TS代码
	name: String, // 股票名称
	area: String, // 所在地域
	industry: String, //所属行业
	list_date: String, // 上市日期
	fina_mainbz: Array // 主营业务
	// ts_code: String, // 
	// end_date: String, // 报告期
	// bz_item: String, // 主营业务来源
	// bz_sales: Number, // 主营业务收入
	// bz_profit: Number, // 主营业务利润
	// bz_cost: Number, // 主营业务成本
	// curr_type: String, // 货币代码
	// update_flag: String //是否更新
},
{
  collection: 'finaMainbz'
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

// 个股资金流向
const moneyflow = new mongoose.Schema({
  ts_code: String,
  trade_date: String,
  buy_sm_vol: String,
  buy_sm_amount: String,
  sell_sm_vol: String,
  sell_sm_amount: String,
  buy_md_vol: String,
  buy_md_amount: String,
  sell_md_vol: String,
  sell_md_amount: String,
  buy_lg_vol: String,
  buy_lg_amount: String,
  sell_lg_vol: String,
  sell_lg_amount: String,
  buy_elg_vol: String,
  buy_elg_amount: String,
  sell_elg_vol: String,
  sell_elg_amount: String,
  net_mf_vol: String,
  net_mf_amount: String,
  close: Number,
  pe: Number,
  pe_ttm: Number,
  pb: Number,
  ps: Number,
  ps_ttm: Number,
  dv_ratio: Number,   
  turnover_rate: Number
},
{
  collection: 'moneyflow'
})

// TTTTT
const tttst = new mongoose.Schema({
  daily_basic: Array
  // ts_code: String,
  // trade_date: String,
  // close: String,
  // turnover_rate: String,
  // turnover_rate_f: String,
  // volume_ratio: String,
  // pe: String,
  // pe_ttm: String,
  // pb: String,
  // ps: String,
  // ps_ttm: String,
  // dv_ratio: String,
  // dv_ttm: String,
  // total_share: String,
  // float_share: String,
  // free_share: String,
  // total_mv: String,
  // circ_mv: String

},
{
  collection: 'tttst'
})



const Models = {
  BASICDATA: mongoose.model('basicData', basicData),
  FINAMAINBZ: mongoose.model('finaMainbz', finaMainbz),
  FD201906: mongoose.model('finalDay', finalDay),
  FD201912: mongoose.model('finalDay1912', finalDay1912),
  STOCKLIST: mongoose.model('stockList', stockList),
  MONEYFLOW: mongoose.model('moneyflow', moneyflow),
  TTTST: mongoose.model('tttst', tttst),
}

module.exports = Models
