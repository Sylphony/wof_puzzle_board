"use strict";

// Global selector cache object
var SelectorCache = {
	add: function(selector, key) {
		if (typeof(key) === "undefined" || typeof(key) === "") {
			throw new Error("add(): Must specify key for selector.")
		}
		if (typeof(SelectorCache[key]) === "undefined") {
			return SelectorCache[key] = selector;
		}
	},
	get: function(key) {
		if (typeof(SelectorCache[key]) !== "undefined") {
			return SelectorCache[key];
		}
		else {
			throw new Error("get(): Could not find selector to retrieve.")
		}
	},
	update: function(selector, key) {
		if (typeof(key) === "undefined" || typeof(key) === "") {
			throw new Error("update(): Must specify key for selector.")
		}
		if (typeof(SelectorCache[key]) !== "undefined") {
			return SelectorCache[key] = selector;
		}
		else {
			throw new Error("update(): The key already has a different cached selector.");
		}
	}
};

function initSelectorAdd() {
	SelectorCache.add($$("#puz-board"), "$puz_board");
	SelectorCache.add($$("#puz-board").getElements(".puz-board-row"), "$board_rows");
}

/* Letter (or symbol) class */
var Letter = new Class({
	initialize: function(letter, row, col) {
		this.letter = letter;
		this.row = row;
		this.col = col;
	}
});

/* Puzzle board class */
var PuzzleBoard = new Class({
	initialize: function() {
		this.numRow = 4;
		this.numCol = 14;
		this.numRowCells = [12, 14, 14, 12];
		this.colStartPos = [2, 1, 1, 2];
	}
});

PuzzleBoard.implement({
	/* Get row from DOM.
	 * @param row: Row number.
	 * @return: The row (as an Elements instance).
	 */
	getRowDOM: function(row) {
		if (row >= 1 && row <= this.numRow) {
			return SelectorCache.get("$board_rows")[0]
				.filter("[data-row-num='" + row + "']");
		}
	},

	/* Get a cell on the board. 
	 * @param letObj: Letter object.
	 * @return: The cell (as an Elements instance).
	 */
	getCell: function(letObj) {
		var trRow = this.getRowDOM(letObj.row);
		return trRow.getChildren(":nth-child(" + letObj.col + ")")[0];
	},

	/* Display letter on board.
	 * @param letObj: Letter object.
	 * @return: The same Elements instance.
	 */
	displayLetter: function(letObj) {
		var $the_cell = this.getCell(letObj);

		this.displayBlueWait.call($the_cell);
		setTimeout(function() {
			$the_cell.set("text", letObj.letter).removeClass("wait").addClass("active");
		}, 1500);

		return this;
	},

	/* Display the cell as a blue box (signal before revealing letter) */
	displayBlueWait: function() {
		this.addClass("wait");
	}
});


function onPageLoad() {
	var board = new PuzzleBoard();

	$("display-letter").addEvent("click", function() {
		var col = $("col-input").get("value");
		var row = $("row-input").get("value");
		var letter = $("letter-input").get("value");

		var theLetter = new Letter(letter, row, col);
		board.displayLetter(theLetter);
	});
}

window.addEvent("domready", initSelectorAdd);
window.onload = onPageLoad;
