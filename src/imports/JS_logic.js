import { MODES, STEPS_VALIDATOR } from './constants';

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
	function handleGameState(gameState) {
		STEPS_VALIDATOR.forEach(validator => {

		});
	}

	return { handleGameState };
})();