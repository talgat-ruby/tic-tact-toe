import { MODES } from './constants';

const AI = (() => {
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

export default AI;