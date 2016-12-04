import React, { PropTypes } from 'react';
import $class from 'classnames';

import { GAME_STATES } from '../imports/constants';
import './InfoBlock.css';

const InfoBlock = ({infoMes, gameState, startNewGame}) => {
	return (
		<div className={$class('info', gameState.toLowerCase())}>
			<p className='info-text'>{infoMes}</p>
			<button onClick={startNewGame}>New Game</button>
		</div>
	);
}

InfoBlock.propTypes = {
	infoMes: PropTypes.string.isRequired,
	gameState: PropTypes.oneOf(Object.values(GAME_STATES)).isRequired,
	startNewGame: PropTypes.func.isRequired
}

export default InfoBlock;