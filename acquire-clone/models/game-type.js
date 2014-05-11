var mongoose = require('mongoose');

/*-----------------------------------------------------------------------------
  game schema
-----------------------------------------------------------------------------*/
var GameType = new mongoose.Schema({
	name: String,
	minPlayers: Number,
	maxPlayers: Number,
	startMoney: Number,
	boardRows: Number,
	boardCols: Number,
	numStock: Number,
	chains: Array,
	}, {collection: 'game-types'});

/*-----------------------------------------------------------------------------
  export model
-----------------------------------------------------------------------------*/
module.exports = mongoose.model('GameType', GameType);

