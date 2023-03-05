import React, { useState } from 'react';
import CanvasController    from './CanvasController';

const Avatar = () => {
	const [inputValue, setInputValue] = useState(146);

	const inputChangeHandler = (e) => {
		setInputValue(e.target.value);
		// console.log(lerp(e.target.value, 130, e.target.value));
	};

	function lerp(s, e, t) {
		return s + (e - s) * t;
	}

	return (
		<>
			<CanvasController inputValue={inputValue}/>
			<div className="sliderList">
				<input type="range"
				       id="Ax"
				       value={inputValue}
				       className="Ax"
				       min="0"
				       max="300"
				       onChange={inputChangeHandler}
				/>
			</div>
		</>
	);
};

export default Avatar;