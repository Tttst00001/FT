const Models = require('./db')
const HTTP = require('./utils/http.js')
const RD = require('./utils/resdata.js')

setTimeout(()=>{
  Foo()
}, 2000)

function Foo(){
  
  Models.BASICDATA.find((err, items) => {
    for (let i = 1411; i < items.length; i++) {
    // for (let i = 0; i < 2; i++) {
      (function (){
        setTimeout(function (){
          let api_db = {
            interface: 'daily_basic',
            data: {
              ts_code: items[i].ts_code
            }
          }

          let api_fi = {
            interface: 'fina_indicator',
            data: {
              ts_code: items[i].ts_code
            }
          }

          let api_bs = {
            interface: 'balancesheet',
            data: {
              ts_code: items[i].ts_code
            }
          }
          let obj = {}
          obj.ts_code = items[i].ts_code
          obj.name = items[i].name
          obj.area = items[i].area
          obj.industry = items[i].industry

          Promise.all([HTTP(api_db), HTTP(api_fi), HTTP(api_bs)]).then(res => {
            
            let $daily_basic = RD(res[0])
            let $fina_indicator = RD(res[0])
            let $balancesheet = RD(res[0])

            obj.daily_basic = $daily_basic
            obj.fina_indicator = $fina_indicator
            obj.balancesheet = $balancesheet
            // console.log(obj)
            // console.log($daily_basic)
            // console.log(Object.prototype.toString.call($daily_basic))
            Models.FINALDATA.insertMany(obj, (err, items) => {
              console.log('ok', i)
            })
          })
        }, (i - 1410) * 1000 * 2)
      })()
    }
  })
}
