const Models = require('./db')
const HTTP = require('./utils/http.js')
const RD = require('./utils/resdata.js')

/*
获取主营业务

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
						interface: 'fina_mainbz',
						data: {
						  ts_code: items[i].ts_code,
						  period: '20190630'
						}
					}
					
					HTTP(args).then(res => {
						let obj = {
							ts_code: items[i].ts_code,
							name: items[i].name,
							area: items[i].area,
							industry: items[i].industry,
							list_date: items[i].list_date,
							fina_mainbz: []
						}
						let lineData = RD(res);
						obj.fina_mainbz.push(lineData)
						Models.FINAMAINBZ.insertMany(obj, (err, items) => {
							console.log('ok', i)
						})
					})
	
				}, i * 1000 * 2)
			})()
		}
	})
}
