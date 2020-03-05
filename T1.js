const HTTP = require('./utils/http.js')


async function Foo(){
  let args = {
    interface: 'daily_basic',
    data: {
      ts_code: '002603.SZ',
      trade_date: '20191231'
    }
  }
  let res = await HTTP(args)
  console.log(res)
}

Foo()
