const Models = require('./db')
const HTTP = require('./utils/http.js')
const RD = require('./utils/resdata.js')

setTimeout(()=>{
  Foo()
}, 2000)

function Foo(){
  
  Models.BASICDATA.find((err, items) => {
    // for (let i = 0; i < items.length; i++) {
    for (let i = 0; i < 1; i++) {
      (function (){
        setTimeout(function (){
          let api_db = {
            interface: 'daily_basic',
            data: {
              ts_code: items[i].ts_code,
              trade_date: '20191231'
            }
          }
          HTTP(api_db).then(dbs => {
            let cbData = RD(dbs)
            items[i]._basic = cbData
            return items[i]
          }).then(cbd01 => {
            let api_fi = {
              interface: 'fina_indicator',
              data: {
                ts_code: cbd01.ts_code,
                period: '20180630'
              }
            }
            HTTP(api_fi).then(fis => {
              let cbData = RD(fis)
              cbd01._fi = cbData
              return cbd01
            })
          }).then(cbd02 => {
            console.log(`cbd02: ${cbd02}`)
            let api_bs = {
              interface: 'balancesheet',
              data: {
                ts_code: cbd02.ts_code,
                period: '20180630'
              }
            }

            HTTP(api_bs).then(bsdata => {
              let cbData = RD(bsdata)
              cbd02._balancesheet = cbData
              console.log(cbd02)
              Models.FINALDATA.insertMany(cbd02, (err, items) => {
                console.log('ok', i)
              })
            })
          })
        }, i * 1000 * 2)
      })()
    }
  })
}
