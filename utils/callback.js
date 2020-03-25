const Models = require("../db");
const HTTP = require('./http.js')
const RD = require('./resdata.js')


function loopData(oargin){
  var arr = []
  for (let i = 0; i < oargin.length; i++) {
    let target = oargin[i];
    let obj = {}
    if (target.fina_indicator.length > 0) {
      if (target.fina_indicator[0].roe > 15 && target.fina_indicator[0].roe < 25) {
        Models.STOCKLIST.find({$or:[{ts_code: target.ts_code}]}).then(Response => {
          let pe = Response[0].pe ? Response[0].pe : Response[0].pe_ttm; // 市盈率
          let total_mv = Response[0].total_mv * 10000; // 总市值
          let np = total_mv / pe; // 净利润
          let total_share = Response[0].total_share * 10000; // 总股本
          let min_np = np / total_share; // 每股净利润 *****
          let pb = Response[0].pb; // 市净率
          let na = total_mv / pb; // 净资产
          let min_na = na / total_share; // 每股净资产 *****
          let close = Response[0].close;
          let dt_netprofit_yoy = target.fina_indicator[0].dt_netprofit_yoy ? target.fina_indicator[0].dt_netprofit_yoy : 0; //净利润增长比
          let count = (min_na + min_np + (min_np * dt_netprofit_yoy / 100)).toFixed(4);
          let rate = ((count - target.daily_basic[0].close) / target.daily_basic[0].close * 100).toFixed(2) + '%'; // 预计涨幅
          console.log(target.ts_code, close, count, rate)
        })
      }
    }
  }
  return arr
}

function callback_mf(arr){
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
  for (let i = 0; i < arr.length; i++) {
    cbData.trade_date.push(arr[i].trade_date)

    cbData.close.push(arr[i].close)
    cbData.pe.push(arr[i].pe)
    cbData.pe_ttm.push(arr[i].pe_ttm)
    cbData.pb.push(arr[i].pb)
    cbData.ps.push(arr[i].ps)
    cbData.ps_ttm.push(arr[i].ps_ttm)
    cbData.dv_ratio.push(arr[i].dv_ratio)
    cbData.turnover_rate.push(arr[i].turnover_rate)

    cbData.buy_sm_amount.push(arr[i].buy_sm_amount)
    cbData.sell_sm_amount.push(arr[i].sell_sm_amount)
    cbData.buy_md_amount.push(arr[i].buy_md_amount)
    cbData.sell_md_amount.push(arr[i].sell_md_amount)
    cbData.buy_lg_amount.push(arr[i].buy_lg_amount)
    cbData.sell_lg_amount.push(arr[i].sell_lg_amount)
    cbData.buy_elg_amount.push(arr[i].buy_elg_amount)
    cbData.sell_elg_amount.push(arr[i].sell_elg_amount)
    cbData.net_mf_amount.push(arr[i].net_mf_amount)
  }

  return cbData
}

const CommonFn = {
  loopData,
  callback_mf
}

module.exports = CommonFn