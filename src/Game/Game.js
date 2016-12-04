import React, { Component, PropTypes } from 'react';

import { Judge } from '../imports/JS_logic';
import { ITEMS, PLAYERS, APP_STATES, MODES, GAME_STATES } from '../imports/constants';
import './Game.css';

import Canvas from '../svg/Canvas';
import InfoBlock from '../InfoBlock/InfoBlock';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			els: [null, null, null, null, null, null, null, null, null],
			curTurn: 0,
			gameState: GAME_STATES.IN_PROGRESS,
			infoMes: '',
			hintLineData: null
		};	

		this.handleEmptyElClick = this.handleEmptyElClick.bind(this);
	}

	handleEmptyElClick(ind) {
		if(this.state.gameState === GAME_STATES.IN_PROGRESS) {
			const els = [...this.state.els.slice(0, ind), ITEMS[this.state.curTurn], ...this.state.els.slice(ind + 1)];
			this.setState({ els });
			this.gameStateHandler(els);
			this.togglePlayer();
		}
	}

	gameStateHandler(els) {
		const { gameState, hintLineData = null } = Judge.gameStateHandler(els, this.props.players);
		const infoMes = this.getInfoMes(gameState);
		this.setState({ gameState, infoMes, hintLineData });
	}

	getInfoMes(gameState) {
		switch(gameState) {
			case GAME_STATES.WIN:
				return 'You Won!';
			case GAME_STATES.LOOSE:
				return 'You Loose!';
			case GAME_STATES.DRAW:
				return 'Draw';
			default:
				return '';
		}
	}

	togglePlayer() {
		this.setState(prevState => {
			return { curTurn: (prevState.curTurn + 1) % 2 };
		});
	}

	render() {
		return (
			<main>
				<h1>Tic-Tac-Toe</h1>
				<Canvas
					els={this.state.els}
					hintLineData={this.state.hintLineData}
					handleEmptyElClick={this.handleEmptyElClick}/>
				{ this.state.gameState !== GAME_STATES.IN_PROGRESS ? 
									<InfoBlock 
										infoMes={this.state.infoMes}
										gameState={this.state.gameState}
										startNewGame={this.props.startNewGame}/> 
									: null }
			</main>
		);
	}
};

Game.propTypes = {
	stateOfApp: PropTypes.oneOf(Object.values(APP_STATES)).isRequired,
	players: PropTypes.arrayOf(PropTypes.oneOf(Object.values(PLAYERS))).isRequired,
	gameMode: PropTypes.oneOf(Object.values(MODES)).isRequired
}

export default Game;