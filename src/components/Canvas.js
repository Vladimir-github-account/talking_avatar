import React, { useEffect, useRef } from 'react';

const Canvas = ({ draw, width, height, props }) => {
	const canvasRef = useRef();

	useEffect(() => {
		const context = canvasRef.current.getContext('2d');
		draw(context);
	});

	function getCoordinates(e) {
		const canvas = canvasRef.current;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		console.log('x: ' + x + ' y: ' + y);
	}

	return <>
		<canvas ref={canvasRef}
		        className="myCanvas"
		        onClick={getCoordinates}
		        width={height}
		        height={width}
		        {...props}/>
	</>;
};
// // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
export default Canvas;