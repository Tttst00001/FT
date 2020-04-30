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


// 业绩快报
const express1812 = new mongoose.Schema({
	ts_code: String, //	TS股票代码
	ann_date: String, //	公告日期
	end_date: String, //	报告期
	revenue: Number, //	营业收入(元)
	operate_profit: Number, //	营业利润(元)
	total_profit: Number, //	利润总额(元)
	n_income: Number, //	净利润(元)
	total_assets: Number, //	总资产(元)
	total_hldr_eqy_exc_min_int: Number, //	股东权益合计(不含少数股东权益)(元)
	diluted_eps: Number, //	每股收益(摊薄)(元)
	diluted_roe: Number, //	净资产收益率(摊薄)(%)
	yoy_net_profit: Number, //	去年同期修正后净利润
	bps: Number, //	每股净资产
	yoy_sales: Number, //	同比增长率:营业收入
	yoy_op: Number, //	同比增长率:营业利润
	yoy_tp: Number, //	同比增长率:利润总额
	yoy_dedu_np: Number, //	同比增长率:归属母公司股东的净利润
	yoy_eps: Number, //	同比增长率:基本每股收益
	yoy_roe: Number, //	同比增减:加权平均净资产收益率
	growth_assets: Number, //	比年初增长率:总资产
	yoy_equity: Number, //	比年初增长率:归属母公司的股东权益
	growth_bps: Number, //	比年初增长率:归属于母公司股东的每股净资产
	or_last_year: Number, //	去年同期营业收入
	op_last_year: Number, //	去年同期营业利润
	tp_last_year: Number, //	去年同期利润总额
	np_last_year: Number, //	去年同期净利润
	eps_last_year: Number, //	去年同期每股收益
	open_net_assets: Number, //	期初净资产
	open_bps: Number, //	期初每股净资产
	perf_summary: String, //		业绩简要说明
	is_audit: String, //		是否审计： 1是 0否
	remark: String //		备注

},
{
  collection: 'express1812'
})


// TEST2018
const testprice2018 = new mongoose.Schema({
  ts_code: String, //TS代码
  name: String, // 股票名称
  area: String, // 所在地域
  industry: String, //所属行业
  daily_basic: Array,
  fina_indicator: Array,
  balancesheet: Array,
  daily_basic_s: Array,
  dividend: Array
},
{
  collection: 'testprice2018'
})

// TEST2019
const testprice2019 = new mongoose.Schema({
  ts_code: String, //TS代码
  name: String, // 股票名称
  area: String, // 所在地域
  industry: String, //所属行业
  daily_basic: Array,
  fina_indicator: Array,
  balancesheet: Array,
  daily_basic_s: Array
},
{
  collection: 'testprice2019'
})

// DIVIDEND
const dividend = new mongoose.Schema({
	ts_code: String,
	list: Array
	// end_date: String,
	// ann_date: String,
	// div_proc: String,
	// stk_div: Number,
	// stk_bo_rate: Number,
	// stk_co_rate: Number,
	// cash_div: Number,
	// cash_div_tax: Number,
	// record_date: String,
	// ex_date: String,
	// pay_date: String,
	// div_listdate: String,
	// imp_ann_date: String,
	// base_date: String,
	// base_share: Number
},
{
  collection: 'dividend'
})

const Models = {
  BASICDATA: mongoose.model('basicData', basicData),
  FINAMAINBZ: mongoose.model('finaMainbz', finaMainbz),
  EXPRESS1812: mongoose.model('express1812', express1812),
  TEST2018: mongoose.model('testprice2018', testprice2018),
  TEST2019: mongoose.model('testprice2019', testprice2019),
  DIVIDEND: mongoose.model('dividend', dividend)
}

module.exports = Models
