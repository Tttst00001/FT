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
				if (i >= items.length) {
					console.log('结束了');
					return
				} else {
					setTimeout(function (){
						let args = {
							interface: 'stk_holdernumber',
							data: {
							  ts_code: items[i].ts_code
							}
						}
						let CallBackArray = [];
						HTTP(args).then(res => {
							let lineData = RD(res);
							let obj = {
								code: items[i].ts_code,
								list: lineData
							}
							//CallBackArray.push(obj)
							
							Models.STKHOLDERNUMBER.insertMany(obj, (err, items) => {
								console.log('ok', i)
							})
						})
	
					}, i * 1000 * 2)
				}
			})()
		}
	})
}
