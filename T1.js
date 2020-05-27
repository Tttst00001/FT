const Models = require("./db");

// cash_div_tax
// stk_div
Models.DIVIDEND.find((err, items) => {
	for(let i=0; i<items.length; i++){
		let ld = items[i].list;
		if(ld[0].cash_div_tax > 1 || ld[0].stk_div > 1){
			console.log(items[i].ts_code, ld[0].cash_div_tax, ld[0].stk_div)
		}
		/* for(let j=0; j<ld.length; j++){
			if(ld[j].cash_div_tax > 1 || ld[j].stk_div > 1){
				console.log(items[i].ts_code, ld[j].cash_div_tax, ld[j].stk_div)
			}
		} */
	}
})
