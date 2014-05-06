function draw() {
	var board = document.getElementById("board");

	var boardContext = board.getContext("2d");

	var squareSize = 70;
	
	boardContext.font = "12pt arial";

	// this draws the board
	boardContext.strokeRect(5.5,5.5,840,630); 
	for (iRowCounter = 0; iRowCounter < 9; iRowCounter++) {
		for (iColCounter = 0; iColCounter < 12; iColCounter++) {
			var y = (iRowCounter*70)+5.5;
			var x = (iColCounter*70)+5.5;
			
			//draws the rectangle for each tile
			boardContext.strokeRect(x,y,70,70);

			//get text for each tile 
			var rowText = tileNamer(iRowCounter, iColCounter);

			//print the text in the center of each rectangle
			var textY = y+40;
			var textX = x+((70-boardContext.measureText(rowText).width)/2);
			boardContext.fillText(rowText, textX, textY);
		}
	}
	
	// this draws the tiles in the tray
	for (tileCounter = 0; tileCounter < 6; tileCounter++) {
		var startX = 130.5 + (90*tileCounter);
		boardContext.strokeRect(startX,655.5,70,70);
		} 

}

function tileNamer(iRow, iCol) { //returns text for each tile based on row/col number
	iCol++;
	if (iRow==0) {
		return iCol + "-" + "A";
	}
	else if (iRow==1) {
		return iCol + "-" + "B";
	}
	else if (iRow==2) {
		return iCol + "-" + "C";
	}
	else if (iRow==3) {
		return iCol + "-" + "D";
	}
	else if (iRow==4) {
		return iCol + "-" + "E";
	}
	else if (iRow==5) {
		return iCol + "-" + "F";
	}
	else if (iRow==6) {
		return iCol + "-" + "G";
	}
	else if (iRow==7) {
		return iCol + "-" + "H";
	}
	else if (iRow==8) {
		return iCol + "-" + "I";
	}
}