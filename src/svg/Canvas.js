import React, { PropTypes } from 'react';

import { RECT_DIMENTIONS, LINE_WIDTH, ITEMS, PLAYERS, DIRECTION } from '../imports/constants';
import { AI } from '../imports/JS_logic';
import './Canvas.css';

import EmptyEl from './EmptyEl';
import X from "./X";
import O from "./O";

const Canvas = ({ els, handleEmptyElClick, hintLineData  }) => {
	const calcCoordinates = (ind) => {
		const rowNum = Math.trunc(ind / 3);
		const colNum = Math.trunc(ind % 3);
		return {
			x: colNum * (RECT_DIMENTIONS + LINE_WIDTH),
			y: rowNum * (RECT_DIMENTIONS + LINE_WIDTH),
			key: ind
		}
	};

	const renderEls = () => {
		return els.map((el, ind) => {
			switch(el) {
				case ITEMS[0]:
					return <X {...calcCoordinates(ind)} />;
				case ITEMS[1]:
					return <O {...calcCoordinates(ind)} />;
				default:
					return <EmptyEl {...calcCoordinates(ind)} onClick={() => handleEmptyElClick(ind)} />;
			}
		})
	};

	const renderHintLine = ({ orderDirection, orderDirectionInd }) => {
		console.log(orderDirection, orderDirectionInd);
		switch(orderDirection) {
			case DIRECTION.ROW:
				const y = (orderDirectionInd * (RECT_DIMENTIONS + LINE_WIDTH)) + (RECT_DIMENTIONS / 2);
				return <line 
							className="hint" 
							x1={ 0.25 * RECT_DIMENTIONS } 
							y1={ y } 
							x2={ (2 * LINE_WIDTH) + (2.75 * RECT_DIMENTIONS) } 
							y2={ y }></line>;
			case DIRECTION.COL:
				const x = (orderDirectionInd * (RECT_DIMENTIONS + LINE_WIDTH)) + (RECT_DIMENTIONS / 2);
				return <line 
							className="hint" 
							x1={ x } 
							y1={ 0.25 * RECT_DIMENTIONS } 
							x2={ x }
							y2={ (2 * LINE_WIDTH) + (2.75 * RECT_DIMENTIONS) }></line>;
			case DIRECTION.DIAG:
				return <line 
							className="hint" 
							x1={ (orderDirectionInd ^ 0) * ((2 * LINE_WIDTH) + (2.5 * RECT_DIMENTIONS)) + 0.25 * RECT_DIMENTIONS } 
							y1={ 0.25 * RECT_DIMENTIONS } 
							x2={ (orderDirectionInd ^ 1) * ((2 * LINE_WIDTH) + (2.5 * RECT_DIMENTIONS)) + 0.25 * RECT_DIMENTIONS } 
							y2={ (2 * LINE_WIDTH) + (2.75 * RECT_DIMENTIONS) }></line>;
			default:
				return null;
		}
	};

	return (
		<svg className="canvas" width="156" height="156" viewBox="0 0 156 156">
			<line className="ver-line line1" x1="51.5" y1="0" x2="51.5" y2="156"></line>
			<line className="ver-line line2" x1="104.5" y1="0" x2="104.5" y2="156"></line>
			<line className="hor-line line3" x1="0" y1="51.5" x2="156" y2="51.5"></line>
			<line className="hor-line line4" x1="0" y1="104.5" x2="156" y2="104.5"></line>
			{ renderEls() }
			{ hintLineData ? renderHintLine(hintLineData) : null }
		</svg>
	);
}

Canvas.propTypes = {
	els: PropTypes.arrayOf(PropTypes.oneOf([...ITEMS, null])).isRequired,
	// players: PropTypes.arrayOf(PropTypes.oneOf(Object.values(PLAYERS))).isRequired,
	handleEmptyElClick: PropTypes.func.isRequired,
	// hintLineData: PropTypes.obj.isRequired
}

export default Canvas;