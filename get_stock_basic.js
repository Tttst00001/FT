const Models = require('./db')
const HTTP = require('./utils/http.js')
const RD = require('./utils/resdata.js')

let args = {
  interface: 'daily_basic',
  data: {
    trade_date: '20200302'
  }
}

HTTP(args).then(res => {
  let list = RD(res)
  Models.STOCKLIST.insertMany(list, (err, data) =>{
    console.log('ok')
  })
})
