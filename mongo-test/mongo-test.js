var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/acquire-clone');

var Chain = require("./models/chain");

/*-----------------------------------------------------------------------------
- open mongoose connection
-----------------------------------------------------------------------------*/
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log("database open");
});

/*-----------------------------------------------------------------------------
- test
-----------------------------------------------------------------------------*/
Chain.findOne({_id: "536d180c48990f1ec5b17079"}, function(err, chain) {
	if(err) throw err;
	var numHotels = 3;

	// get stock price
	chain.getStockPrice(numHotels, function(err, price) {
		if(err) console.log(err);
		
		console.log(price);
	});

	// get majority bonus
	chain.getMajorityBonus(numHotels, function(err, bonus) {
		if(err) console.log(err);
		
		console.log(bonus);
	});

	// get minority bonus
	chain.getMajorityBonus(numHotels, function(err, bonus) {
		if(err) console.log(err);
		
		console.log(bonus);
	});
});

