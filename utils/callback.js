const Models = require("../db");

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

const CommonFn = {
  loopData
}

module.exports = CommonFn