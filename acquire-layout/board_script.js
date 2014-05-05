function draw() {
	var board = document.getElementById("board");
	var tray = document.getElementById("tray");

	var boardContext = board.getContext("2d");
	var trayContext = tray.getContext("2d");

	var squareSize = 70;
	
	boardContext.font = "12pt arial";

	// this draws the board
	for (iRowCounter = 0; iRowCounter < 9; iRowCounter++) {
		for (iColCounter = 0; iColCounter < 12; iColCounter++) {
			var y = (iRowCounter*70);
			var x = (iColCounter*70);
			
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
		var startX = 130 + (90*tileCounter);
		trayContext.strokeRect(startX,5,70,70);
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