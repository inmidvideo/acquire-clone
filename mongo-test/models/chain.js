var mongoose = require("mongoose");

/*-----------------------------------------------------------------------------
  chain schema
-----------------------------------------------------------------------------*/
var Chain = new mongoose.Schema({
	chainName: String,
	chainColor: String,
	numStock: Number,
	stockPrice: { num: Array, price: Array },
	majorityBonus: { num: Array, bonus: Array },
	minorityBonus: { num: Array, bonus: Array }
	},
	{collection: 'chains'});

/*-----------------------------------------------------------------------------
  get stock price
-----------------------------------------------------------------------------*/
Chain.methods.getStockPrice = function(x, callback) {
	var xt = this.stockPrice.num;
	var yt = this.stockPrice.price;

	this.lookupVal(x, xt, yt, callback);
}

/*-----------------------------------------------------------------------------
  get majority bonus
-----------------------------------------------------------------------------*/
Chain.methods.getMajorityBonus = function(x, callback) {
	var xt = this.majorityBonus.num;
	var yt = this.majorityBonus.bonus;

	this.lookupVal(x, xt, yt, callback);
}

/*-----------------------------------------------------------------------------
  get minority bonus
-----------------------------------------------------------------------------*/
Chain.methods.getMinorityBonus = function(x, callback) {
	var xt = this.minorityBonus.num;
	var yt = this.minorityBonus.bonus;

	this.lookupVal(x, xt, yt, callback);
}

/*-----------------------------------------------------------------------------
  lookup value
-----------------------------------------------------------------------------*/
Chain.methods.lookupVal = function(x, xt, yt, callback) {
	// check for equal table length
	if(xt.length != yt.length) {
		callback(new Error("chainSchema.methods.lookupVal: xt.length = " + xt.length + ", yt.length = " + yt.length));
	}

	// check for valid x
	if(x < xt[0]) {
		callback(new Error("chainSchema.methods.lookupVal: x = " + x + ", xt[0] = " + xt[0]));
	}

	// find val within num array
	for(var i = 1; i < xt.length; i++) {
		if(x < xt[i]) {
			callback(null, yt[i - 1]);
			return;
		}
	}

	// outside of num array, return max val
	callback(null, yt[yt.length - 1]);	
}

/*-----------------------------------------------------------------------------
  export model
-----------------------------------------------------------------------------*/
module.exports = mongoose.model('Chain', Chain);

