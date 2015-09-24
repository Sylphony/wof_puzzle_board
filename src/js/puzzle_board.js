"use strict";

// Cache object for DOM elements
var CACHEeleObj = {
	//puzBoard: $$(".puz-board")[0],
};

/* Puzzle Board class */
var PuzzleBoard = new Class({
	initialize: function(board) {
		this.board = board; // Board itself
		this.rows = board.rows; // Row elements
		this.numCols = [];	// Number of columns, as an array
		this.startCols = [];
	}
});

/* Retreive methods */
PuzzleBoard.implement({
	// Gets the number of columns for each row
	// @return arr: An array of column numbers
	getNumCols: function() {
		var arr = [];
		var board = this.board;
		for (var row_num=0; row_num < board.rows.length; row_num++) {
			var row_cells = board.rows[row_num].children;
			var length = row_cells.length;
			for (var col_num=0; col_num < row_cells.length; col_num++) {
				if (row_cells[col_num].hasClass("corner")) {
					length = length - 1; // Remove the corners count
				}
			}
			arr.push(length);
		}
		return arr;
	},

	// Gets the starting column of each row
	// @return arr: An array of starting column values
	getStartCols: function() {
		var arr = [];
		var board = this.board;
		for (var row_num=0; row_num < board.rows.length; row_num++) {
			var row_cells = board.rows[row_num].children;
			var startCol = 1;
			for (var col_num=0; col_num < row_cells.length; col_num++) {
				if (!row_cells[col_num].hasClass("corner")) {
					startCol = col_num + 1;	// 1-indexed for consistency
					break;	
				}
			}
			arr.push(startCol);
		}
		return arr;
	},
});

/* Support methods */
PuzzleBoard.implement({
	// Display a letter on the board
	displayLetter: function(Letter) {
		var board = this.board;
		
	},


	// Clear the board
	clearBoard: function(board) {
		for (var row_num=0; row_num < board.rows.length; row_num++) {

		} 
	}

});


window.addEvent("domready", function() {
	var $$puz_board = $$(".puz-board");
	$$puz_board.addClass("hello");
	
	var board_obj = new PuzzleBoard($$puz_board[0]);
	board_obj.numCols = board_obj.getNumCols();
	board_obj.startCols = board_obj.getStartCols();
	//console.log(CacheObj.table);
});