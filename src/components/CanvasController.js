import React  from 'react';
import Canvas from './Canvas';
import image  from './avatar.png';

const CanvasController = ({ ax, ay, ...props }) => {
	const img = new Image();
	img.src = image;

	const points = {
		bx: Number(ax) + Number((145 - ax) * 0.8),
		by: Number(ay) + Number((145 - ay) * 0.7) - 100,
		cx: Number(ax) + Number((145 - ax) * 0.8),
		cy: Number(ay) + Number((145 - ay) * 0.5) + 85
	};

	function drawAvatar(ctx) {
		const { bx, by, cx, cy } = points;
		ctx.clearRect(0, 0, 300, 300);
		ctx.globalAlpha = 0.3;
		ctx.drawImage(img, 0, 0, 300, 300);
		ctx.globalAlpha = 1;
		drawBody(ctx);
		drawHead(ctx, bx, by, cx, cy);

		drawPoint(ctx, ax, ay, 'A');
		drawPoint(ctx, bx, by, 'B');
		drawPoint(ctx, cx, cy, 'C');
	}

	function drawHead(ctx, bx, by, cx, cy) {
		ctx.beginPath();
		ctx.moveTo(bx, by);
		// ctx.quadraticCurveTo(ax, ay, 145, 221);
		ctx.quadraticCurveTo(ax, ay, cx, cy);
		ctx.moveTo(72, 130);
		ctx.quadraticCurveTo(ax, ay, 215, 130);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(bx, by);
		ctx.quadraticCurveTo(80, 46, 72, 130);
		// ctx.quadraticCurveTo(87, 189, 145, 221);
		ctx.quadraticCurveTo(87, 189, cx, cy);
		ctx.quadraticCurveTo(196, 188, 215, 130);
		ctx.quadraticCurveTo(210, 40, bx, by);
		ctx.stroke();

		drawEyes(ctx);
	}

	function drawEyes(ctx) {
		ctx.beginPath();
		drawLeftEye(ctx);
		drawRightEye(ctx);
	}

	function drawRightEye(ctx) {
		const xDistanceFromCenter = Math.abs((ax - 145) / 100) * 1.5;
		const yDistanceFromCenter = Math.abs((ay - 132) / 100) * 1.5;
		let rightAx = ax;
		let rightAy = Number(ay);
		ctx.save();
		if (ax > 145) {
			ctx.scale(1 - xDistanceFromCenter, 1);
			rightAx = ax * (1 + xDistanceFromCenter);
		}
		if (Math.abs(ay - 132) > 4) {
			ctx.scale(1, 1 - yDistanceFromCenter);
			rightAy = ay * (1 + yDistanceFromCenter);
		}
		ctx.moveTo(rightAx - -12, rightAy + 10);
		ctx.quadraticCurveTo(rightAx - -19, rightAy + 20, rightAx - -34, rightAy + 20);
		ctx.quadraticCurveTo(rightAx - -48, rightAy + 17, rightAx - -50, rightAy + 3);
		ctx.quadraticCurveTo(rightAx - -49, rightAy - 2, rightAx - -32, rightAy - 4);
		ctx.quadraticCurveTo(rightAx - -15, rightAy - 4, rightAx - -13, rightAy + 11);
		ctx.stroke();
		ctx.restore();
	}

	function drawLeftEye(ctx) {
		const xDistanceFromCenter = Math.abs((ax - 145) / 100) * 1.5;
		const yDistanceFromCenter = Math.abs((ay - 132) / 100) * 1.5;
		let leftAx = ax;
		let leftAy = Number(ay);
		ctx.save();
		if (ax < 145) {
			ctx.scale(1 - xDistanceFromCenter, 1);
			leftAx = ax * (1 + xDistanceFromCenter * 1.5);
		}
		if (Math.abs(ay - 132) > 4) {
			ctx.scale(1, 1 - yDistanceFromCenter);
			leftAy = ay * (1 + yDistanceFromCenter);
		}
		ctx.moveTo(leftAx - 12, leftAy + 10);
		ctx.quadraticCurveTo(leftAx - 19, leftAy + 20, leftAx - 34, leftAy + 20);
		ctx.quadraticCurveTo(leftAx - 48, leftAy + 17, leftAx - 50, leftAy + 3);
		ctx.quadraticCurveTo(leftAx - 48, leftAy -2, leftAx - 32, leftAy - 4);
		ctx.quadraticCurveTo(leftAx - 15, leftAy -4, leftAx - 13, leftAy + 11);
		ctx.stroke();
		ctx.restore();
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
		ctx.arc(x, y, rad, 0, Math.PI * 2);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.fillStyle = 'black';
		ctx.font = rad * 2 + 'px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(label, x, y);
	}

	return (
		<Canvas draw={drawAvatar} width={300} height={300}/>
	);
};

export default CanvasController;