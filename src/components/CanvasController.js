import React  from 'react';
import Canvas from './Canvas';
import image  from './avatar.png';

const CanvasController = ({ ax, ay, ...props }) => {
	const img = new Image();
	img.src = image;

	const points = {
		bx: ax + (145 - ax) * 0.8,
		by: ay + (145 - ay) * 0.7 - 100,
		cx: ax + (145 - ax) * 0.8,
		cy: ay + (145 - ay) * 0.5 + 85
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
		drawHeadSkeleton(ctx, bx, by, cx, cy);
		drawEyes(ctx);
		drawNoise(ctx);
	}

	function drawNoise(ctx) {
		const xDistanceFromCenter = Math.abs((ax - 145) / 100) * 0.6;
		const yDistanceFromCenter = Math.abs((ay - 132) / 100) * 1.2;
		let noiseAy = ay;
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(ax, ay + 18);
		let noiseAx;
		if (Math.abs(ay - 132) > 4) {
			ctx.scale(1, 1 - yDistanceFromCenter);
			noiseAy = ay * (1 + yDistanceFromCenter);
		}
		if (ax <= 145) {
			noiseAx = ax * (1 - xDistanceFromCenter);
			(noiseAx - ax) > 7
			? ctx.quadraticCurveTo(noiseAx, noiseAy + 30, ax, noiseAy + 35)
			: ctx.quadraticCurveTo(noiseAx - 4, noiseAy + 30, ax, noiseAy + 35);
		}
		if (ax > 145) {
			noiseAx = ax * (1 + xDistanceFromCenter);
			(noiseAx - ax) > 7
			? ctx.quadraticCurveTo(noiseAx, noiseAy + 30, ax, noiseAy + 35)
			: ctx.quadraticCurveTo(noiseAx + 3, noiseAy + 30, ax, noiseAy + 35);
		}

		ctx.stroke();
		ctx.restore();
	}

	function drawEyes(ctx) {
		ctx.beginPath();
		const yDistanceFromCenter = Math.abs((ay - 132) / 100) * 1.2;
		let eyeAy = ay;
		ctx.save();
		if (Math.abs(ay - 132) > 4) {
			ctx.scale(1, 1 - yDistanceFromCenter);
			eyeAy = ay * (1 + yDistanceFromCenter);
		}
		drawLeftEye(ctx, eyeAy);
		drawRightEye(ctx, eyeAy);
		ctx.restore();
	}

	function drawRightEye(ctx, eyeAy) {
		const xDistanceFromCenter = Math.abs((ax - 145) / 100) * 1.5;
		let rightAx = ax;
		if (ax > 145) {
			ctx.scale(1 - xDistanceFromCenter, 1);
			rightAx = ax * (1 + xDistanceFromCenter);
		}
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.arc(rightAx + 25, eyeAy + 7, 7, 0, Math.PI * 2);
		ctx.fill();
		drawRightEyebrow(ctx, rightAx, eyeAy);
		drawRightEyeSkeleton(ctx, rightAx, eyeAy);
	}

	function drawRightEyebrow(ctx, x, y) {
		ctx.moveTo(x + 48, y - 5);
		ctx.quadraticCurveTo(x + 40, y - 10, x + 27, y - 9);
		ctx.quadraticCurveTo(x + 23, y - 10, x + 15, y - 3);
		ctx.quadraticCurveTo(x + 24, y - 7, x + 27, y - 7);
		ctx.quadraticCurveTo(x + 28, y - 8, x + 48, y - 5);
		ctx.fill();
	}

	function drawRightEyeSkeleton(ctx, x, y) {
		ctx.moveTo(x + 12, y + 10);
		ctx.quadraticCurveTo(x + 19, y + 20, x + 34, y + 20);
		ctx.quadraticCurveTo(x + 48, y + 17, x + 50, y + 3);
		ctx.quadraticCurveTo(x + 49, y - 2, x + 32, y - 4);
		ctx.quadraticCurveTo(x + 15, y - 4, x + 13, y + 11);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
		ctx.fill();
		ctx.stroke();
	}

	function drawLeftEye(ctx, eyeAy) {
		const xDistanceFromCenter = Math.abs((ax - 145) / 100) * 1.5;
		let leftAx = ax;
		ctx.save();
		if (ax < 145) {
			ctx.scale(1 - xDistanceFromCenter, 1);
			leftAx = ax * (1 + xDistanceFromCenter * 1.5);
		}
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.arc(leftAx - 25, eyeAy + 7, 7, 0, Math.PI * 2);
		ctx.fill();
		drawLeftEyebrow(ctx, leftAx, eyeAy);
		drawLeftEyeSkeleton(ctx, leftAx, eyeAy);
		ctx.restore();
	}

	function drawLeftEyebrow(ctx, x, y) {
		ctx.moveTo(x - 48, y - 5);
		ctx.quadraticCurveTo(x - 40, y - 10, x - 27, y - 9);
		ctx.quadraticCurveTo(x - 23, y - 10, x - 15, y - 3);
		ctx.quadraticCurveTo(x - 24, y - 7, x - 27, y - 7);
		ctx.quadraticCurveTo(x - 28, y - 8, x - 48, y - 5);
		ctx.fill();
	}

	function drawLeftEyeSkeleton(ctx, x, y) {
		ctx.moveTo(x - 12, y + 10);
		ctx.quadraticCurveTo(x - 19, y + 20, x - 34, y + 20);
		ctx.quadraticCurveTo(x - 48, y + 17, x - 50, y + 3);
		ctx.quadraticCurveTo(x - 48, y - 2, x - 32, y - 4);
		ctx.quadraticCurveTo(x - 15, y - 4, x - 13, y + 11);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
		ctx.fill();
		ctx.stroke();
	}

	function drawHeadSkeleton(ctx, bx, by, cx, cy) {
		ctx.beginPath();
		ctx.moveTo(bx, by);
		ctx.quadraticCurveTo(ax, ay, cx, cy);
		ctx.moveTo(72, 130);
		ctx.quadraticCurveTo(ax, ay, 215, 130);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(bx, by);
		ctx.quadraticCurveTo(80, 46, 72, 130);
		ctx.quadraticCurveTo(87, 189, cx, cy);
		ctx.quadraticCurveTo(196, 188, 215, 130);
		ctx.quadraticCurveTo(210, 40, bx, by);
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