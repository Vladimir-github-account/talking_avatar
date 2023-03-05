import React, { useEffect, useRef } from 'react';

const Canvas = ({ draw, height, width, props }) => {
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

// const ctx = canvas.getContext('2d');
// // ctx.fillStyle = 'yellow';
// // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
// const img = new Image();
// img.src = image;
// let animationFrameId;
// ctx.clearRect(0, 0, canvas.width, canvas.height);
// animate(ctx, img, canvas.width, canvas.height);
//
// img.onload = () => {
// 	// animate(ctx, img, canvas.width, canvas.height);
// };

// function animate(ctx, img, width, height) {
// 	ctx.clearRect(0, 0, width, height);
// 	ctx.globalAlpha = 0.3;
// 	ctx.drawImage(img, 0, 0, width, height);
// 	ctx.globalAlpha = 1;
// 	drawAvatar(ctx);
// }
export default Canvas;