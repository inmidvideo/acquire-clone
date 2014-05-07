var express = require("express");
var app = express();
var port = 8765;

// mysql initialization
var mysql = require("mysql");
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'dd00ww',
	database : 'nodejs-test'
});
connection.connect();

// express initialization
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
	res.render("page");
}); 
app.use(express.static(__dirname + '/public'));

// socket.io initialization
var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

// on client connection
io.sockets.on('connection', function (socket) {
	// query mysql for existing messages
	connection.query('SELECT * FROM posts ORDER BY id ASC', function(err, rows, fields) {
		if (err) throw err;

		// send all previous messages to client
		for(i = 0; i < rows.length; i++) {
			socket.emit('message', { username: rows[i].name, message: rows[i].message });
		}
	});

	// repeat new messages to all clients
	socket.on('send', function (data) {
		io.sockets.emit('message', data);

		// insert into database
		connection.query('INSERT INTO posts SET ?', {name: data.username, message: data.message}, function(err, result) {
			if (err) throw err;

			console.log(result.insertId);
		});
	});
});

