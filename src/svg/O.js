import React, { PropTypes } from 'react';
import "./O.css";

const O = (props) => {
	return (
		<svg className="o" width="50" height="50" viewBox="0 0 50 50" {...props}>
			<circle className="circle" cx="25" cy="25" r="17"></circle>
		</svg>
	);
}

O.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired
};

export default O;