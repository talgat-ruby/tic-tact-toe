import React, { Component } from 'react';
import { rectDimention, lineWidth, MODES, Players } from '../imports/constants';
import AI from '../imports/AI';
import './Canvas.css';

import EmptyEl from './EmptyEl';
import X from "./X";
import O from "./O";

class Canvas extends Component {
	constructor(props) {
		super(props);
		this.state = {
			els: [null, null, null, 'o', null, 'o', null, null, null],
			curTurn: PLayers.User
		};

		this.picks = {
			user: 'x',
			ai: 'o'
		};

		this.renderEls = this.renderEls.bind(this);
		this.calcCoordinates = this.calcCoordinates.bind(this);
		this.handleEmptyElClick = this.handleEmptyElClick.bind(this);
	}

	renderEls() {
		return this.state.els.map((el, ind) => {
			switch(el) {
				case 'x':
					return <X {...this.calcCoordinates(ind)} />;
				case 'o':
					return <O {...this.calcCoordinates(ind)} />;
				default:
					return <EmptyEl {...this.calcCoordinates(ind)} onClick={() => this.handleEmptyElClick(ind)} />;
			}
		})
	}

	calcCoordinates(ind) {
		const rowNum = Math.trunc(ind / 3);
		const colNum = Math.trunc(ind % 3);
		return {
			x: colNum * (rectDimention + lineWidth),
			y: rowNum * (rectDimention + lineWidth),
			key: ind
		}
	}

	handleEmptyElClick(ind) {
		this.setState({
			els: [...this.state.els.slice(0, ind), this.picks.user, ...this.state.els.slice(ind + 1)]
		});
	}

	render() {
		return (
			<svg className="canvas" width="156" height="156" viewBox="0 0 156 156">
				<line className="ver-line line1" x1="51.5" y1="0" x2="51.5" y2="156"></line>
				<line className="ver-line line2" x1="104.5" y1="0" x2="104.5" y2="156"></line>
				<line className="hor-line line3" x1="0" y1="51.5" x2="156" y2="51.5"></line>
				<line className="hor-line line4" x1="0" y1="104.5" x2="156" y2="104.5"></line>
				{ this.renderEls() }
			</svg>
		);
	}
}

export default Canvas;