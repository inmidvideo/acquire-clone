// this creates a global 2D array that stores the board information
var boardState = new Array(108);
for (i = 0; i < 108; i++) {
	boardState[i] = new Array(3);
	boardState[i][0] = tileNamer(i);	//name of tile
	boardState[i][1] = tileLocation(i);
	boardState[i][2] = "Available";  		//tile status
}
	
boardState[28][2] = "Occupied"; //temporary line to demonstrate filled space
boardState[98][2] = "Occupied"; //temporary line to demonstrate filled space
boardState[42][2] = "Unavailable"; //temporary line to demonstrate filled space

function draw() {

	var board = document.getElementById("board");

	var boardContext = board.getContext("2d");
	
	boardContext.font = "12pt arial";

	// this draws the board outline
	boardContext.strokeRect(5.5,5.5,840,630); 
	
	// this draws the squares based on the data stored in the boardState array
	
	for (d = 0; d < 108; d++) {
	
		if (boardState[d][2] == "Available") {
			
			boardContext.strokeRect(boardState[d][1][0],boardState[d][1][1],70,70);
		
			boardContext.fillStyle = "black";
			var rowText = boardState[d][0];
			var textY = boardState[d][1][1]+40;
			var textX = boardState[d][1][0]+((70-boardContext.measureText(rowText).width)/2);
			boardContext.fillText(rowText, textX, textY);
			
		} else {
		
			if (boardState[d][2] == "Occupied") {
				boardContext.fillStyle = "black";
			}
			else {
				boardContext.fillStyle = "gray";
			}
			
			boardContext.fillRect(boardState[d][1][0],boardState[d][1][1],70,70);
		
			boardContext.fillStyle = "white";
			var rowText = boardState[d][0];
			var textY = boardState[d][1][1]+40;
			var textX = boardState[d][1][0]+((70-boardContext.measureText(rowText).width)/2);
			boardContext.fillText(rowText, textX, textY);
		}
	}

	// this draws the tiles in the tray
	for (tileCounter = 0; tileCounter < 6; tileCounter++) {
		var startX = 130.5 + (90*tileCounter);
		boardContext.strokeRect(startX,655.5,70,70);
		} 

}

function tileNamer(tileNum) { //returns name of each tile based on position

	var rowNum = Math.floor(tileNum/12);
	var colNum = (tileNum % 12)+1;
	var rowString = String.fromCharCode(rowNum + 65);
	
	return colNum + "-" + rowString;
}

function tileLocation(tileNum) { //returns array with x and y location
	
	var rowNum = Math.floor((tileNum)/12);
	var colNum = tileNum % 12;
	
	var xLocation = (colNum*70) + 5.5;
	var yLocation = (rowNum*70) + 5.5;

	var position = new Array();
	position[0] = xLocation;
	position[1] = yLocation;
	
	return position;

}