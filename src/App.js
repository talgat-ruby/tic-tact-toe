import React, { Component } from 'react';
import { PLAYERS } from './imports/constants';
import './App.css';

import Canvas from './svg/Canvas';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			players: [ PLAYERS.User, PLAYERS.AI ]
		}
	}

    render() {
        return (
            <div className="App">
                <Canvas players={this.state.players}/>
            </div>
        );
    }
}

export default App;
