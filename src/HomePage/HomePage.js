import React, { Component, PropTypes } from 'react';
import $class from 'classnames';

import { MODES, ITEMS } from '../imports/constants';
import './HomePage.css'


class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pickedItem: ITEMS[0],
			pickedMode: this.props.gameMode
		}

		this.renderItems = this.renderItems.bind(this);
		this.renderModes = this.renderModes.bind(this);
		this.modeClickHandler = this.modeClickHandler.bind(this);
		this.itemClickHandler = this.itemClickHandler.bind(this);
	}

	renderItems(item) {
		return <span 
					key={item}
					title={item}
					className={$class('item', {selected: item === this.state.pickedItem})}
					onClick={this.itemClickHandler}>
						{item}
				</span>;
	}

	itemClickHandler({ target: { title } }) {
		if(this.state.pickedItem !== title) {
			this.setState({ pickedItem: title });
		}
	}

	renderModes(mode) {
		return <span 
					key={mode}
					title={mode} 
					className={$class('mode', {selected: mode === this.state.pickedMode})}
					onClick={this.modeClickHandler}>
						{mode}
				</span>
	}

	modeClickHandler({ target: { title } }) {
		if(this.state.pickedMode !== title) {
			this.setState({ pickedMode: title });
		}
	}

	render() {
		const {pickedItem, pickedMode} = this.state;

		return (
			<div className="home-page">
				<h1 className="welcome-title">Welcome to tic-tac-toe</h1>
				<nav>
					<article className="items">
						<h3>Picked<span className="sub">*</span>: <span>{pickedItem}</span></h3>
						<div className="choose">
							{ ITEMS.map(item => this.renderItems(item)) }
						</div>
						<cite>* X moves first</cite>
					</article>
					<article className="modes">
						<h3>Mode: <span>{pickedMode}</span></h3>
						<div className="choose">
							{ Object.values(MODES).map(mode => this.renderModes(mode)) }
						</div>
					</article>
				</nav>
				<button onClick={() => {this.props.onStartGame(pickedItem, pickedMode)}}>Start</button>
			</div>
		);
	}
}

HomePage.propTypes = {
	onStartGame: PropTypes.func.isRequired
}

export default HomePage;