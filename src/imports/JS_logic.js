import { MODES, ITEMS, PLAYERS, GAME_STATES, DIRECTION } from './constants';

export const AI = (() => {
	let predefinedAlgorithm = '';
	let indexOfStartingItem = null;

	function nextMove(mode, pickedItem, curState) {
		if(curState.filter(item => item).length <= 1) {
			predefinedAlgorithm = '';
			indexOfStartingItem = null;
		}
		switch(mode) {
			case MODES.EASY:
				const indEasy = twoInSeq(pickedItem, curState);
				return indEasy ? indEasy : curState.findIndex(item => !item);
			case MODES.HARD:
				const indHard = twoInSeq(pickedItem, curState);
				return indHard ? indHard : otherAlgorithms(pickedItem, curState);
			default:
				return null;
		}
	}

	function twoInSeq(pickedItem, curState) {
		const totalArray = [];
		for(let i = 0; i < 3; i++) {
			const firstRowElIndex = i * 3;
			const firstColElIndex = i;
			const rowArray = [];
			const colArray = [];
			for(let j = 0; j < 3; j++) {
				const rowItem = curState[firstRowElIndex + j];
				if(rowItem) {
					rowArray.unshift(rowItem);
				} else {
					rowArray.push(firstRowElIndex + j);
				}

				const colItem = curState[firstColElIndex + 3 * j];
				if(colItem) {
					colArray.unshift(colItem);
				} else {
					colArray.push(firstColElIndex + 3 * j);
				}
			}
			if(rowArray[0] === rowArray[1] && !isNaN(rowArray[2])) {
				totalArray.push(rowArray);
			}
			if(colArray[0] === colArray[1] && !isNaN(colArray[2])) {
				totalArray.push(colArray);;
			}
		}

		for(let i = 0; i < 2; i++) {
			const firstElIndex = i * 2;
			const diagArray = [];
			for(let j = 0; j < 3; j++) {
				const diagItem = curState[firstElIndex + 4 * j - 2 * i * j];
				if(diagItem) {
					diagArray.unshift(diagItem);
				} else {
					diagArray.push(firstElIndex + 4 * j - 2 * i * j);
				}
			}
			if(diagArray[0] === diagArray[1] && !isNaN(diagArray[2])) {
				totalArray.push(diagArray);
			}
		}

		const lastItem = totalArray.find(arr => arr && arr[0] === pickedItem) || totalArray[0];
		return lastItem && lastItem[2];
	}

	function otherAlgorithms(pickedItem, curState) {
		if(!curState[4]) {
			return 4;
		} else if(!predefinedAlgorithm) {
			const isAttackTactic = curState[4] === pickedItem && (curState.filter(item => item).length <= 2 || curState[1] === curState[7] || curState[3] === curState[5]);
			if(isAttackTactic) {
				predefinedAlgorithm = 'Border tactic';
			} else {
				predefinedAlgorithm = 'Defend';
			}
		}

		switch(predefinedAlgorithm) {
			case 'Border tactic':
				return borderTactic(pickedItem, curState);
			case 'Defend':
				return defendTactic(pickedItem, curState);
			default:
				return curState.findIndex(item => !item);
		}
	}

	function borderTactic(pickedItem, curState) {
		if(!indexOfStartingItem && indexOfStartingItem !== 0) {
			const indexOfOppositeCorner = curState.findIndex((item, ind) => (item) && (ind % 2 === 0) && (ind !== 4));
			const isOppositeCornerEmpty = indexOfOppositeCorner > -1 && !curState[indexOfOppositeCorner];
			if(isOppositeCornerEmpty) {
				return indexOfStartingItem = indexOfOppositeCorner > -1 ? (8 - indexOfOppositeCorner) : 0;
			} else {
				predefinedAlgorithm = 'none';
				return 1;
			}
		} else {
			const stepRow = indexOfStartingItem % 3 ? -1 : 1;
			const stepCol = indexOfStartingItem < 4 ? 3 : -3;
			return curState[indexOfStartingItem + stepRow] ? (indexOfStartingItem + stepCol) : (indexOfStartingItem + stepRow);
		}
	}

	function defendTactic(pickedItem, curState) {
		if(!indexOfStartingItem && indexOfStartingItem !== 0) {
			const numOfItems = curState.filter(item => item).length;
			const indexOfFirstOppositeItem = curState.findIndex(item => item && item !== pickedItem); 
			const indexOfCorner = indexOfFirstOppositeItem < 3 ? indexOfFirstOppositeItem - 1 : indexOfFirstOppositeItem + 3;
			return indexOfStartingItem = numOfItems > 1 ? indexOfCorner : 0;
		} else {
			predefinedAlgorithm = 'none';
			return curState.findIndex((item, ind) => !item && (ind % 2 === 0));
		}
	}

	return { nextMove };
})();



export const Judge = (() => {
	function looseOrWin(el, players) {
		return players[ITEMS.findIndex(item => item === el)] === PLAYERS.USER ? GAME_STATES.WIN : GAME_STATES.LOOSE;
	}

	function gameStateHandler(gameCanvas, players) {
		// row && col check
		for(let i = 0; i < 3; i++) {
			const firstRowElIndex = i * 3;
			const isWonInRow = gameCanvas[firstRowElIndex] && gameCanvas[firstRowElIndex] === gameCanvas[firstRowElIndex + 1] && gameCanvas[firstRowElIndex] === gameCanvas[firstRowElIndex + 2];
			const firstColElIndex = i;
			const isWonInCol = gameCanvas[firstColElIndex] && gameCanvas[firstColElIndex] === gameCanvas[firstColElIndex + 3] && gameCanvas[firstColElIndex] === gameCanvas[firstColElIndex + 6];
			if(isWonInRow) {
				return {
					gameState: looseOrWin(gameCanvas[firstRowElIndex], players),
					hintLineData: {
						orderDirection: DIRECTION.ROW,
						orderDirectionInd: i
					}
				};
			}
			if(isWonInCol) {
				return {
					gameState: looseOrWin(gameCanvas[firstColElIndex], players),
					hintLineData: {
						orderDirection: DIRECTION.COL,
						orderDirectionInd: i
					}
				};
			}
		}

		// vertical1 check
		if(gameCanvas[0] && gameCanvas[0] === gameCanvas[4] && gameCanvas[0] === gameCanvas[8]) {
			return {
				gameState: looseOrWin(gameCanvas[0], players),
				hintLineData: {
					orderDirection: DIRECTION.DIAG,
					orderDirectionInd: 0
				}
			};
		}

		// vertical2 check
		if(gameCanvas[2] && gameCanvas[2] === gameCanvas[4] && gameCanvas[2] === gameCanvas[6]) {
			return {
				gameState: looseOrWin(gameCanvas[2], players),
				hintLineData: {
					orderDirection: DIRECTION.DIAG,
					orderDirectionInd: 1
				}
			};
		}

		if(gameCanvas.some(el => !el)) {
			return {gameState: GAME_STATES.IN_PROGRESS};
		}
		return {gameState: GAME_STATES.DRAW};
	}

	return { gameStateHandler };
})();