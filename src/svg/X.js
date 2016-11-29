import React from 'react';
import "./X.css";

const X = () => {
	return (
		<svg className="x" width="40" height="40" viewBox="0 0 40 40">
			<line className="line1" x1="0" y1="0" x2="40" y2="40"></line>
			<line className="line2" x1="0" y1="40" x2="40" y2="0"></line>
		</svg>
	);
}

export default X;