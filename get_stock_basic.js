const Models = require('./db')
const HTTP = require('./utils/http.js')
const RD = require('./utils/resdata.js')

/*
股票列表

*/
let args = {
  interface: 'stock_basic',
  data: {}
}

HTTP(args).then(res => {
  let list = RD(res)
  Models.BASICDATA.insertMany(list, (err, data) =>{
    console.log('ok')
  })
})
