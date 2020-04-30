const Models = require('./db')
const HTTP = require('./utils/http.js')
const RD = require('./utils/resdata.js')

/*
获取2018年年报

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
						interface: 'express',
						data: {
						  ts_code: items[i].ts_code,
						  period: '20181231'
						}
					}
					
					HTTP(args).then(res => {
						let lineData = RD(res);
						
						
						Models.EXPRESS1812.insertMany(lineData, (err, items) => {
							console.log('ok', i)
						})
					})
	
				}, i * 1000 * 2)
			})()
		}
	})
}
