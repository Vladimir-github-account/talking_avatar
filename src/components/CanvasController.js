import React  from 'react';
import Canvas from './Canvas';
import image  from './avatar.png';

const CanvasController = ({ inputValue, ...props }) => {
	const img = new Image();
	img.src = image;

	function drawAvatar(ctx) {
		ctx.clearRect(0, 0, 300, 300);
		ctx.globalAlpha = 0.3;
		ctx.drawImage(img, 0, 0, 300, 300);
		ctx.globalAlpha = 1;
		drawBody(ctx);
		drawHead(ctx);

		drawPoint(ctx, inputValue, 132, 'A');
	}

	function drawHead(ctx) {
		ctx.beginPath();
		ctx.moveTo(145, 33);
		// ctx.lineTo(145, 221);
		ctx.quadraticCurveTo(inputValue, 128, 145, 221);
		ctx.moveTo(72, 130);
		ctx.lineTo(215, 130);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(145, 33);
		ctx.quadraticCurveTo(80, 46, 72, 130);
		ctx.quadraticCurveTo(87, 189, 145, 221);
		ctx.quadraticCurveTo(196, 188, 215, 130);
		ctx.quadraticCurveTo(215, 40, 145, 33);
		ctx.stroke();
	}

	function drawBody(ctx) {
		ctx.beginPath();
		ctx.moveTo(116, 205);
		ctx.quadraticCurveTo(118, 217, 114, 242);
		ctx.lineTo(19, 265);
		ctx.lineTo(19, 310);
		ctx.lineTo(277, 310);
		ctx.lineTo(277, 265);
		ctx.lineTo(182, 237);
		ctx.quadraticCurveTo(177, 217, 179, 198);
		ctx.stroke();
	}

	function drawPoint(ctx, x, y, label, rad = 7) {
		ctx.beginPath();
		ctx.arc(inputValue, y, rad, 0, Math.PI * 2);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.fillStyle = 'black';
		ctx.font = rad * 2 + 'px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(label, inputValue, y);
	}

	return (
		<Canvas draw={drawAvatar} width={300} height={300}/>
	);
};

export default CanvasController;