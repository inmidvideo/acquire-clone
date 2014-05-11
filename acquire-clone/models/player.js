var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

/*-----------------------------------------------------------------------------
  game schema
-----------------------------------------------------------------------------*/
var Player = new mongoose.Schema({
	gameId: ObjectId,
	userId: ObjectId,
	money: Number,
	}, {collection: 'players'});

/*-----------------------------------------------------------------------------
  export model
-----------------------------------------------------------------------------*/
module.exports = mongoose.model('Player', Player);

