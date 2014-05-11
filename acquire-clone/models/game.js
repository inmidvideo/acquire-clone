var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Player = require('./player');

/*-----------------------------------------------------------------------------
  tile schema
-----------------------------------------------------------------------------*/
var Tile = new mongoose.Schema({
	state: Number,
	chainId: ObjectId,
	playerId: ObjectId
	}, {collection: 'tiles'});

/*-----------------------------------------------------------------------------
  stock schema
-----------------------------------------------------------------------------*/
var Stock = new mongoose.Schema({
	state: Number,
	chainId: ObjectId,
	playerId: ObjectId
	}, {collection: 'stocks'});

/*-----------------------------------------------------------------------------
  game schema
-----------------------------------------------------------------------------*/
var Game = new mongoose.Schema({
	gameType: ObjectId,
	gameState: Number,
	createDate: { type: Date, default: Date.now },
	privateGame: Boolean,
	players: [Player],
	stock: [Stock],
	tiles: [Tile],
	}, {collection: 'games'});

/*-----------------------------------------------------------------------------
  export model
-----------------------------------------------------------------------------*/
module.exports.Game = mongoose.model('Game', Game);
module.exports.Tile = mongoose.model('Tile', Tile);
module.exports.Stock = mongoose.model('Stock', Stock);

