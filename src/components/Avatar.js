import React, { useState } from 'react';
import CanvasController    from './CanvasController';

const Avatar = () => {
	const [ax, setAx] = useState(146);
	const [ay, setAy] = useState(132);
	// const [bx, setBx] = useState(145);
	// const [by, setBy] = useState(33);

	const xInputChangeHandler = (e) => {
		setAx(Number(e.target.value));
	};

	const yInputChangeHandler = (e) => {
		setAy(Number(e.target.value));
	};

	function lerp(s, e, t) {
		return s + (e - s) * t;
	}

	return (
		<>
			<CanvasController ax={ax}
			                  ay={ay}/>
			<div className="sliderList">
				<input type="range"
				       id="Ax"
				       value={ax}
				       className="Ax"
				       min="130"
				       max="160"
				       onChange={xInputChangeHandler}
				/>
				<input type="range"
				       id="Ay"
				       value={ay}
				       className="Ay"
				       min="120"
				       max="140"
				       onChange={yInputChangeHandler}
				/>
				{/*<input type="range"*/}
				{/*       id="Bx"*/}
				{/*       value={bx}*/}
				{/*       className="Bx"*/}
				{/*       min="100"*/}
				{/*       max="200"*/}
				{/*       onChange={x2InputChangeHandler}*/}
				{/*/>*/}
				{/*<input type="range"*/}
				{/*       id="By"*/}
				{/*       value={by}*/}
				{/*       className="By"*/}
				{/*       min="15"*/}
				{/*       max="50"*/}
				{/*       onChange={y2InputChangeHandler}*/}
				{/*/>*/}
			</div>
		</>
	);
};

export default Avatar;