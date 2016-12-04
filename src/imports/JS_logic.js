import { MODES, ITEMS, PLAYERS, GAME_STATES, DIRECTION } from './constants';

export const AI = (() => {
	function nextMove(mode, curState) {
		switch(mode) {
			case MODES.EASY:
				console.log('easy');
				break;
			case MODES.HARD:
				console.log('hard');
				break;
			default:
				console.log('default')
				break;
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