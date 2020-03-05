const Models = require('./db')
const HTTP = require('./utils/http.js')
const RD = require('./utils/resdata.js')

setTimeout(()=>{
  Foo()
}, 2000)

function Foo(){
  
  Models.BASICDATA.find((err, items) => {
    for (let i = 0; i < items.length; i++) {
    // for (let i = 0; i < 2; i++) {
      (function (){
        setTimeout(function (){
          let api_db = {
            interface: 'daily_basic',
            data: {
              ts_code: items[i].ts_code,
              trade_date: '20200228'
            }
          }

          let api_fi = {
            interface: 'fina_indicator',
            data: {
              ts_code: items[i].ts_code,
              period: '20191231'
            }
          }

          let api_bs = {
            interface: 'balancesheet',
            data: {
              ts_code: items[i].ts_code,
              period: '20191231'
            }
          }
          let obj = {}
          obj.ts_code = items[i].ts_code
          obj.name = items[i].name
          obj.area = items[i].area
          obj.industry = items[i].industry

          Promise.all([HTTP(api_db), HTTP(api_fi), HTTP(api_bs)]).then(res => {
            let $daily_basic = RD(res[0])
            let $fina_indicator = RD(res[1])
            let $balancesheet = RD(res[2])
            obj.daily_basic = $daily_basic
            obj.fina_indicator = $fina_indicator
            obj.balancesheet = $balancesheet
            Models.FD201912.insertMany(obj, (err, items) => {
              console.log('ok', i)
            })
          }).catch(err => {
            console.log(err, i)
          })
        }, i * 1000 * 2)
      })()
    }
  })
}
