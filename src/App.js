import React, { Component } from 'react';
import { PLAYERS, ITEMS, MODES, APP_STATES } from './imports/constants';
import './App.css';

import HomePage from './HomePage/HomePage';
import Game from './Game/Game'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
            stateOfApp: APP_STATES.START,
			players: [PLAYERS.USER, PLAYERS.AI],
            gameMode: MODES.EASY
		};

        this.onStartGame = this.onStartGame.bind(this);
        this.startNewGame = this.startNewGame.bind(this);
	}

    onStartGame(userPick, gameMode) {
        let players = [];
        if(userPick === ITEMS[0]) {
            players = [PLAYERS.USER, PLAYERS.AI];
        } else {
            players = [PLAYERS.AI, PLAYERS.USER];
        }

        this.setState({
            stateOfApp: APP_STATES.GAME,
            players,
            gameMode
        });
    }

    startNewGame() {
        this.setState({
            stateOfApp: APP_STATES.START
        });
    }

    renderAppChild() {
        switch(this.state.stateOfApp) {
            case APP_STATES.START:
                return <HomePage onStartGame={this.onStartGame}/>;
            case APP_STATES.GAME:
            case APP_STATES.END:
                return <Game {...this.state} startNewGame={this.startNewGame}/>;
            default:
                return null;
        }
    }

    render() {
        return (
            <div className="App">
                { this.renderAppChild() }
            </div>
        );
    }
}

export default App;
