const Models = require('./db')
const HTTP = require('./utils/http.js')
const RD = require('./utils/resdata.js')

/*
分红送股

*/
let args = {
  interface: 'dividend',
  data: {}
}

HTTP(args).then(res => {
  let list = RD(res)
  Models.DIVIDENT2018.insertMany(list, (err, data) =>{
    console.log('ok')
  })
})
