const Models = require("../db");

function loopData(oargin){
  var arr = []
  for (let i = 0; i < oargin.length; i++) {
    let target = oargin[i];
    let obj = {}
    if(target.daily_basic[0] && target.fina_indicator[0] && target.balancesheet[0]){
      let pe = target.daily_basic[0].pe ? target.daily_basic[0].pe : 0; // 市盈率
      let total_mv = target.daily_basic[0].total_mv ? target.daily_basic[0].total_mv * 10000 : 0; // 总市值
      let np = total_mv / pe; // 净利润
      let total_share = target.daily_basic[0].total_share ? target.daily_basic[0].total_share * 10000 : 0; // 总股本
      let min_np = np / total_share; // 每股净利润 *****
      let pb = target.daily_basic[0].pb ? target.daily_basic[0].pb : 0; // 市净率
      let na = total_mv / pb; // 净资产
      let min_na = na / total_share; // 每股净资产 *****
      let dt_netprofit_yoy = target.fina_indicator[0].dt_netprofit_yoy ? target.fina_indicator[0].dt_netprofit_yoy : 0; //净利润增长比
      let count = (min_na + min_np + (min_np * dt_netprofit_yoy / 100)).toFixed(4);
      obj.code = target.ts_code;
      obj.name = target.name;
      obj.industry = target.industry;
      obj.close = target.daily_basic[0].close ? target.daily_basic[0].close : 0; // 收盘价
      obj.count = count; // 预计价格
      obj.rate = ((count - target.daily_basic[0].close) / target.daily_basic[0].close * 100).toFixed(2) + '%'; // 预计涨幅
      obj.min_np = (min_np).toFixed(2)
      obj.min_na = (min_na).toFixed(2)
      obj.dt_netprofit_yoy = (dt_netprofit_yoy / 100).toFixed(2)
      obj.total_mv = total_mv / 100000000
      obj.goodwill = target.balancesheet[0].goodwill ? (target.balancesheet[0].goodwill / 100000000).toFixed(2) : 0; // 商誉
      if(parseInt(obj.rate) > 0 && dt_netprofit_yoy > 0 && dt_netprofit_yoy < 500){
        arr.push(obj)
      }
    }
  }
  return arr
}

const CommonFn = {
  loopData
}

module.exports = CommonFn