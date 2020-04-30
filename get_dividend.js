const Models = require('./db')
const HTTP = require('./utils/http.js')
const RD = require('./utils/resdata.js')

/*
获取分红送股

*/

setTimeout(() => {
	callFun()
}, 1000 * 2)

function callFun(){
	Models.BASICDATA.find((err, items) => {
		for(let i = 0; i < items.length; i++){
		// for(let i = 0; i < 1; i++){
			(function (){
				setTimeout(function (){
					let args = {
						interface: 'dividend',
						data: {
						  ts_code: items[i].ts_code
						}
					}
					
					HTTP(args).then(res => {
            let lineData = RD(res);
            console.log('lineData', Object.prototype.toString.call(lineData))
            let obj = {
              ts_code: items[i].ts_code,
              list: lineData
            }
						Models.DIVIDEND.insertMany(obj, (err, items) => {
							console.log('ok', i)
						})
					})
	
				}, i * 1000 * 2)
			})()
		}
	})
}
