const Models = require('./db')
const HTTP = require('./utils/http.js')
const RD = require('./utils/resdata.js')

setTimeout(()=>{
  Foo()
}, 2000)

function Foo(){
  
  Models.BASICDATA.find((err, items) => {
    for (let i = 1720; i < items.length; i++) {
    // for (let i = 0; i < 2; i++) {
      (function (){
        setTimeout(function (){
          let args = {
            interface: 'daily_basic',
            data: {
              ts_code: items[i].ts_code,
              trade_date: '20191231'
            }
          }
          HTTP(args).then(res => {
            console.log('res', res)
            let cbData = RD(res)
            items[i]._basic = cbData
            return items[i]
          }).then(res => {
            let args = {
              interface: 'fina_indicator',
              data: {
                ts_code: items[i].ts_code,
                period: '20190630'
              }
            }
    
            HTTP(args).then(res => {
              let cbData = RD(res)
              items[i]._fi = cbData
              Models.FULLDATA.insertMany(items[i], (err, items) => {
                console.log('ok', i)
              })
            })
          })
        }, (i - 1720) * 1000 * 2)
      })()
    }
  })
}

















// var list = []

// let args = {
//   interface: 'stock_basic',
//   data: {}
// }

// HTTP(args).then( res => {
//   for (let i = 0; i < res.length; i++) {
//     let obj = {}
//     obj.ts_code = res[i][0]
//     obj.name = res[i][2]
//     obj.area = res[i][3]
//     obj.industry = res[i][4]
//     list.push(obj)
//   }
//   Models.BASICDATA.insertMany(list, (err, data) =>{
//     console.log('ok')
//   })
// })
