const Models = require('./db')
const HTTP = require('./utils/http.js')
const RD = require('./utils/resdata.js')

setTimeout(() => {
  let args = {
    interface: 'daily_basic',
    data: {
      trade_date: '20200320'
    }
  }
  foo(args)
}, 2000)

function foo(args){
  HTTP(args).then(res => {
    let list = RD(res)
    for (let i = 0; i < list.length; i++) {
      Models.FD201906.update({ts_code: list[i].ts_code}, {daily_basic: list[i]}).then(cb => {
        console.log(cb)
      })
    }
  })
}








// HTTP(args).then(res => {
//   // let obj = {
//   //   daily_basic: []
//   // }
//   let list = RD(res)
//   // obj.daily_basic.push(list)
//   // Models.TTTST.insertMany(obj, (err, data) =>{
//   //   console.log('ok')
//   // })

//   Models.TTTST.update({ts_code: '600057.SH'}, {daily_basic: list}).then(cb => {
//     console.log(cb)
//   })
// })
