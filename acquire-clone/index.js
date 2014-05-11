var path = require('path');
var express = require("express");
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/*-----------------------------------------------------------------------------
  express config
-----------------------------------------------------------------------------*/
var app = express();
app.set('port', process.env.PORT || 8765);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.use(require('body-parser')());
app.use(require('cookie-parser')('inmidsecret'));
app.use(require('cookie-session')({ keys: ['inmidkey'] }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.pretty = true;

/*-----------------------------------------------------------------------------
  passport config
-----------------------------------------------------------------------------*/
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*-----------------------------------------------------------------------------
  mongoose config
-----------------------------------------------------------------------------*/
mongoose.connect('mongodb://localhost:27017/acquire-clone');

var GameType = require('./models/game-type');
var Game = require('./models/game').Game;
var Tile = require('./models/game').Tile;
var Stock = require('./models/game').Stock;
var User = require('./models/user');
var Player = require('./models/player');

/*-----------------------------------------------------------------------------
  routing
-----------------------------------------------------------------------------*/
// index
app.get('/', function (req, res) {
	res.render('index', { user : req.user });
});

// login get
app.get('/login', function(req, res) {
	res.render('login', { user : req.user });
});

// login post
app.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('/');
});

// register get
app.get('/register', function(req, res) {
	res.render('register', { });
});

// register post
app.post('/register', function(req, res) {
	User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
		if (err) return res.render('register', { user : user });

		passport.authenticate('local')(req, res, function () {
			res.redirect('/');
		});
	});
});

// logout
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// new game
app.get('/newGame', function(req, res) {
	// get default game type
	GameType.findOne({ name: /^Default/ }, function (err, gameType) {
  		if (err) return console.error(err);
  		//console.log(req);
  		
  		// create tiles
  		newTiles = []
  		for(var i = 0; i < gameType.boardRows*gameType.boardCols; i++) {
  			var tile = new Tile({
  				state: 0,
  				chainId: null,
  				playerId: null
  			});
  			newTiles.push(tile);
  		}

  		// create stock
  		newStock = []
  		for(var i = 0; i < gameType.chains.length; i++) {
  			for(var j = 0; j < gameType.numStock; j++) {
	  			var stock = new Stock({
	  				chainId: gameType.chains[i],
	  				playerId: null
	  			});
	  			newStock.push(stock);
	  		}
  		}
	
		// create new game
		var newGame = new Game({
			gameType : gameType.id,
			gameState : 0,
			createDate: new Date,
			privateGame : false,
			players : [],
			tiles : newTiles,
			stock: newStock
		});
		newGame.save(function(err, newGame) {
			if(err) throw err;

			console.log(req.user.id);
			// create new player
			var newPlayer = new Player({
  				gameId : newGame.id,
  				userId : req.user.id,
  				money : gameType.startMoney
  			});
  			newPlayer.save(function(err, newPlayer) {
  				if(err) throw err;

  				// add player to game

  			});

			res.redirect('/game/' + newGame.id);

			// broadcast new game to lobby
			lobby.emit("newGame", { game : newGame.id });
		})
	})
});

// game
app.get('/game', function(req, res) {
	res.redirect('/');
});

// game with id
app.get('/game/:id', function(req, res) {
	res.render('game', { user : req.user, game : req.params.id });
});

/*-----------------------------------------------------------------------------
  socket.io initialization
-----------------------------------------------------------------------------*/
var io = require('socket.io').listen(app.listen(app.get('port')));

// lobby connection
var lobby = io.of('/lobby').on('connection', function(socket) {
	console.log("lobby connection");

	// on connection, send all open games
	Game.find({}, function(err, games) {
		if(err) throw err;

		// iterate through games
		for(var i = 0; i < games.length; i++) {
			socket.emit('newGame', { game: games[i]._id });
		}
	})
})

// game connection
var game = io.of('/game').on('connection', function(socket) {
	
})


