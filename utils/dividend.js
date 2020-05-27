const Models = require("../db");

function Fun_dividend(data){
	let arr = []
	for (let i = 0; i < data.length; i++) {
		let target = data[i];
		let obj = {}
		obj.code = target.ts_code
		obj.name = target.name
		obj.industry = target.industry
		if (target.list.length > 10 ) {
			obj.num = target.list.length
		}
		arr.push(obj)
	}
	
	arr = arr.sort((a, b) => {
		return b.num - a.num;
	})
	
	return arr
}

function Fun_dividend_info(data, val){
	let arr;
	for (let i =0; i < data.length; i++) {
		if (data[i].ts_code == val) {
			arr = data[i].list
			break;
		}
	}
	return arr
}

module.exports = { Fun_dividend, Fun_dividend_info }