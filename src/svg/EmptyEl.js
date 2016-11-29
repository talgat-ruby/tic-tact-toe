import React from 'react';
import "./EmptyEl.css"

const EmptyEl = (props) => {
	return (
			<svg className="empty-el" width="50" height="50" viewBox="0 0 50 50" {...props}>
				<rect x="0" y="0" width="50" height="50"></rect>
			</svg>	
		);
	}

export default EmptyEl;