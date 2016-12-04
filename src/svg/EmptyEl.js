import React, { PropTypes } from 'react';
import "./EmptyEl.css"

const EmptyEl = (props) => {
	return (
		<svg className="empty-el" width="50" height="50" viewBox="0 0 50 50" {...props}>
			<rect x="0" y="0" width="50" height="50"></rect>
		</svg>	
	);
}

EmptyEl.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired
};

export default EmptyEl;