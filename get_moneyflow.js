const Models = require('./db')
const HTTP = require('./utils/http.js')
const RD = require('./utils/resdata.js')

let moneyflow = {
  interface: 'moneyflow',
  data: {
    ts_code: '600057.SH',
    start_date: '20200102',
    end_date: '20200306'
  }
}

let daily_basic ={
  interface: 'daily_basic',
  data: {
    ts_code: '600057.SH',
    start_date: '20200102',
    end_date: '20200306'
  }
}

Promise.all([HTTP(moneyflow), HTTP(daily_basic)]).then(res => {
  let _moneyflow = RD(res[0])
  let _daily_basic = RD(res[1])
  let data = []
  for (let i = 0; i < _moneyflow.length; i++) {
    let obj = {}
    obj.trade_date = _moneyflow[i].trade_date

    obj.buy_sm_amount = (_moneyflow[i].buy_sm_amount * 10000 / 10000000).toFixed(5)
    obj.sell_sm_amount = (_moneyflow[i].sell_sm_amount * 10000 / 10000000).toFixed(5)
    obj.buy_md_amount = (_moneyflow[i].buy_md_amount * 10000 / 10000000).toFixed(5)
    obj.sell_md_amount = (_moneyflow[i].sell_md_amount * 10000 / 10000000).toFixed(5)
    obj.buy_lg_amount = (_moneyflow[i].buy_lg_amount * 10000 / 10000000).toFixed(5)
    obj.sell_lg_amount = (_moneyflow[i].sell_lg_amount * 10000 / 10000000).toFixed(5)
    obj.buy_elg_amount = (_moneyflow[i].buy_elg_amount * 10000 / 10000000).toFixed(5)
    obj.sell_elg_amount = (_moneyflow[i].sell_elg_amount * 10000 / 10000000).toFixed(5)
    obj.net_mf_amount = (_moneyflow[i].net_mf_amount * 10000 / 10000000).toFixed(5)



    // obj.buy_sm_vol = _moneyflow[i].buy_sm_vol
    // obj.sell_sm_vol = _moneyflow[i].sell_sm_vol
    // obj.buy_md_vol = _moneyflow[i].buy_md_vol
    // obj.sell_md_vol = _moneyflow[i].sell_md_vol
    // obj.buy_lg_vol = _moneyflow[i].buy_lg_vol
    // obj.sell_lg_vol = _moneyflow[i].sell_lg_vol
    // obj.buy_elg_vol = _moneyflow[i].buy_elg_vol
    // obj.sell_elg_vol = _moneyflow[i].sell_elg_vol
    // obj.net_mf_vol = _moneyflow[i].net_mf_vol
    // obj.net_mf_amount = _moneyflow[i].net_mf_amount
    obj.close = _daily_basic[i].close
    obj.pe = _daily_basic[i].pe
    obj.pe_ttm = _daily_basic[i].pe_ttm
    obj.pb = _daily_basic[i].pb
    obj.ps = _daily_basic[i].ps
    obj.ps_ttm = _daily_basic[i].ps_ttm
    obj.dv_ratio = _daily_basic[i].dv_ratio
    obj.turnover_rate = _daily_basic[i].turnover_rate
    data.unshift(obj)
  }
  Models.MONEYFLOW.insertMany(data, (err, items) => {
    console.log('ok', data.length)
  })
}).catch(err => {
  console.log(err, i)
})

