import React, { PropTypes } from 'react';
import "./X.css";

const X = (props) => {
	return (
		<svg className="x" width="50" height="50" viewBox="0 0 50 50" {...props}>
			<line className="line1" x1="10" y1="10" x2="40" y2="40"></line>
			<line className="line2" x1="40" y1="10" x2="10" y2="40"></line>
		</svg>
	);
}

X.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired
};

export default X;