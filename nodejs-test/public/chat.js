window.onload = function() {
	var messages = [];
	var socket = io.connect(document.URL);
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var name = document.getElementById("name");
 
	// process message from socket
	socket.on('message', function (data) {
		// if message contains data
		if(data.message) {
			messages.push(data);
			var html = '';

			// iterate through messages, add to html
			for(var i=0; i < messages.length; i++) {
				html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
				html += messages[i].message + '<br />';
			}

			// set html in content and scroll to latest message
			content.innerHTML = html;
			content.scrollTop = content.scrollHeight;
			}
		else {
			console.log("There is a problem:", data);
		}
	});
 
	// on send button click
	sendButton.onclick = function() {
		// check for name
		if(name.value == "") {
			alert("Please type your name!");
		}
		// send message
		else {
			socket.emit('send', { message: field.value, username: name.value });
			field.value = "";
		}
	}; 
}

