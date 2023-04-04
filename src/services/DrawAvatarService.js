import image                       from '../components/avatar.png';
import { clothesColor, skinColor } from '../constants';

const img = new Image();
img.src = image;

export default class DrawAvatarService {
	drawAvatar(ctx, points, ax, ay) {
		const { drawHead, drawBody } = DrawAvatarService;
		const { bx, by, cx, cy } = points;
		const xDistanceFromCenter = (ax - 145) / 100;
		ctx.clearRect(0, 0, 300, 300);
		ctx.globalAlpha = 0.3;
		ctx.drawImage(img, 0, 0, 300, 300);
		ctx.globalAlpha = 1;
		ctx.save();
		ctx.translate(xDistanceFromCenter * 3, 0);
		drawBody(ctx, cx, cy);
		ctx.restore();
		drawHead(ctx, bx, by, cx, cy, ax, ay);
		// drawPoint(ctx, ax, ay, 'A');
		// drawPoint(ctx, bx, by, 'B');
		// drawPoint(ctx, cx, cy, 'C');
	}

	static drawHead(ctx, bx, by, cx, cy, ax, ay) {
		const { drawHeadSkeleton, drawEyes, drawNoise, drawEars } = DrawAvatarService;
		drawHeadSkeleton(ctx, bx, by, cx, cy, ax, ay);
		drawEyes(ctx, ax, ay);
		drawNoise(ctx, ax, ay);
		ctx.save();
		const xDistanceFromCenter = (ax - 145) / 100;
		ctx.translate(xDistanceFromCenter * 8, 0);
		drawEars(ctx, by + 100, ax, ay);
		ctx.restore();
	}

	static drawEars(ctx, by, ax, ay) {
		const { drawLeftEar, drawRightEar } = DrawAvatarService;
		const xDistanceFromCenter = Math.abs((ax - 145) / 100) * 1.4;
		const yDistanceFromCenter = Math.abs((ay - 132) / 100) * 0.5;
		let eyeAy = by;
		ctx.save();
		if (Math.abs(ay - 132) > 4) {
			ctx.scale(1, 1 - yDistanceFromCenter);
			eyeAy = by * (1 + yDistanceFromCenter);
		}
		const leftEarModifier = ax > 145
		                        ? (1 + xDistanceFromCenter * 0.2)
		                        : (1 + xDistanceFromCenter * 1.5);
		const rightEarModifier = ax < 145
		                         ? (1 - xDistanceFromCenter * 0.1)
		                         : (1 + xDistanceFromCenter * 0.70);
		drawLeftEar(ctx, leftEarModifier, eyeAy, ax);
		drawRightEar(ctx, rightEarModifier, eyeAy, ax);
		ctx.restore();
	}

	static drawLeftEar(ctx, xMod, y, ax) {
		const xDistanceFromCenter = Math.abs((ax - 145) / 100) * 1.4;
		ctx.save();
		if (ax < 145) {
			ctx.scale(1 - xDistanceFromCenter, 1);
		}
		ctx.beginPath();
		ctx.moveTo((145 - 68) * xMod, y - 12);
		ctx.quadraticCurveTo((145 - 72) * xMod, y - 18, (145 - 75) * xMod, y - 13);
		ctx.quadraticCurveTo((145 - 80) * xMod, y + 7, (145 - 68) * xMod, y + 15);
		ctx.quadraticCurveTo((145 - 65) * xMod, y + 15, (145 - 64) * xMod, y + 10);
		ctx.moveTo((145 - 66) * xMod, y + 8);
		ctx.quadraticCurveTo((145 - 70) * xMod, y + 7.5, (145 - 69) * xMod, y + 9.5);
		ctx.moveTo((145 - 70) * xMod, y + 8);
		ctx.quadraticCurveTo((145 - 72.5) * xMod, y + 1, (145 - 71.5) * xMod, y);
		ctx.moveTo((145 - 70.5) * xMod, y - 8);
		ctx.quadraticCurveTo((145 - 72) * xMod, y - 2, (145 - 72) * xMod, y - 0.5);
		ctx.fillStyle = skinColor;
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}

	static drawRightEar(ctx, xMod, y, ax) {
		const xDistanceFromCenter = Math.abs((ax - 145) / 100) * 0.9;
		ctx.save();
		if (ax > 145) {
			ctx.scale(1 - xDistanceFromCenter, 1);
		}
		ctx.beginPath();
		ctx.moveTo((145 + 68) * xMod, y - 12);
		ctx.quadraticCurveTo((145 + 72) * xMod, y - 18, (145 + 75) * xMod, y - 13);
		ctx.quadraticCurveTo((145 + 80) * xMod, y + 7, (145 + 68) * xMod, y + 15);
		ctx.quadraticCurveTo((145 + 65) * xMod, y + 15, (145 + 64) * xMod, y + 10);
		ctx.moveTo((145 + 66) * xMod, y + 8);
		ctx.quadraticCurveTo((145 + 70) * xMod, y + 7.5, (145 + 69) * xMod, y + 9.5);
		ctx.moveTo((145 + 70) * xMod, y + 8);
		ctx.quadraticCurveTo((145 + 72.5) * xMod, y + 1, (145 + 71.5) * xMod, y);
		ctx.moveTo((145 + 70.5) * xMod, y - 8);
		ctx.quadraticCurveTo((145 + 72) * xMod, y - 2, (145 + 72) * xMod, y - 0.5);
		ctx.fillStyle = skinColor;
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}

	static drawNoise(ctx, ax, ay) {
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

	static drawEyes(ctx, ax, ay) {
		const { drawLeftEye, drawRightEye } = DrawAvatarService;
		ctx.beginPath();
		const yDistanceFromCenter = Math.abs((ay - 132) / 100) * 1.2;
		let eyeAy = ay;
		ctx.save();
		if (Math.abs(ay - 132) > 4) {
			ctx.scale(1, 1 - yDistanceFromCenter);
			eyeAy = ay * (1 + yDistanceFromCenter);
		}
		drawLeftEye(ctx, eyeAy, ax);
		drawRightEye(ctx, eyeAy, ax);
		ctx.restore();
	}

	static drawRightEye(ctx, eyeAy, ax) {
		const { drawRightEyebrow, drawRightEyeSkeleton } = DrawAvatarService;
		ctx.beginPath();
		const xDistanceFromCenter = Math.abs((ax - 145) / 100) * 1.5;
		let rightAx = ax;
		if (ax > 145) {
			ctx.scale(1 - xDistanceFromCenter, 1);
			rightAx = ax * (1 + xDistanceFromCenter);
		}
		drawRightEyebrow(ctx, rightAx, eyeAy);
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.arc(rightAx + 25, eyeAy + 7, 7, 0, Math.PI * 2);
		ctx.fill();
		drawRightEyeSkeleton(ctx, rightAx, eyeAy);
	}

	static drawRightEyebrow(ctx, x, y) {
		ctx.moveTo(x + 48, y - 5);
		ctx.quadraticCurveTo(x + 40, y - 10, x + 27, y - 9);
		ctx.quadraticCurveTo(x + 23, y - 10, x + 15, y - 3);
		ctx.quadraticCurveTo(x + 24, y - 7, x + 27, y - 7);
		ctx.quadraticCurveTo(x + 28, y - 8, x + 48, y - 5);
		ctx.fillStyle = 'rgba(0, 0, 0, 1)';
		ctx.fill();
	}

	static drawRightEyeSkeleton(ctx, x, y) {
		ctx.moveTo(x + 12, y + 10);
		ctx.quadraticCurveTo(x + 19, y + 20, x + 34, y + 20);
		ctx.quadraticCurveTo(x + 48, y + 17, x + 50, y + 3);
		ctx.quadraticCurveTo(x + 49, y - 2, x + 32, y - 4);
		ctx.quadraticCurveTo(x + 15, y - 4, x + 13, y + 11);
		ctx.fillStyle = 'rgba(255, 255, 255, 1)';
		ctx.fill();
		ctx.stroke();
	}

	static drawLeftEye(ctx, eyeAy, ax) {
		const { drawLeftEyebrow, drawLeftEyeSkeleton } = DrawAvatarService;
		const xDistanceFromCenter = Math.abs((ax - 145) / 100) * 1.5;
		let leftAx = ax;
		ctx.save();
		if (ax < 145) {
			ctx.scale(1 - xDistanceFromCenter, 1);
			leftAx = ax * (1 + xDistanceFromCenter * 1.5);
		}
		drawLeftEyebrow(ctx, leftAx, eyeAy);
		ctx.beginPath();
		drawLeftEyeSkeleton(ctx, leftAx, eyeAy);
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.arc(leftAx - 25, eyeAy + 7, 7, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}

	static drawLeftEyebrow(ctx, x, y) {
		ctx.moveTo(x - 48, y - 5);
		ctx.quadraticCurveTo(x - 40, y - 10, x - 27, y - 9);
		ctx.quadraticCurveTo(x - 23, y - 10, x - 15, y - 3);
		ctx.quadraticCurveTo(x - 24, y - 7, x - 27, y - 7);
		ctx.quadraticCurveTo(x - 28, y - 8, x - 48, y - 5);
		ctx.fillStyle = 'rgba(0, 0, 0, 1)';
		ctx.fill();
	}

	static drawLeftEyeSkeleton(ctx, x, y) {
		ctx.moveTo(x - 12, y + 10);
		ctx.quadraticCurveTo(x - 19, y + 20, x - 34, y + 20);
		ctx.quadraticCurveTo(x - 48, y + 17, x - 50, y + 3);
		ctx.quadraticCurveTo(x - 48, y - 2, x - 32, y - 4);
		ctx.quadraticCurveTo(x - 15, y - 4, x - 13, y + 11);
		ctx.fillStyle = 'rgba(255, 255, 255, 1)';
		ctx.fill();
		ctx.stroke();
	}

	static drawHeadSkeleton(ctx, bx, by, cx, cy, ax, ay) {
		ctx.beginPath();
		ctx.moveTo(bx, by);
		ctx.quadraticCurveTo(ax, ay, cx, cy);
		ctx.moveTo(72, 130);
		ctx.quadraticCurveTo(ax, ay, 215, 130);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(bx, by);
		ctx.quadraticCurveTo(78, 46, 72, 130);
		ctx.quadraticCurveTo(87, 194, cx, cy);
		ctx.quadraticCurveTo(203, 194, 218, 130);
		ctx.quadraticCurveTo(210, 40, bx, by);
		ctx.stroke();
		ctx.fillStyle = skinColor;
		ctx.fill();
	}

	static drawBody(ctx, cx, cy) {
		const { drawClothes } = DrawAvatarService;
		ctx.beginPath();
		ctx.moveTo(cx - 29, cy - 23);
		ctx.quadraticCurveTo(118, 217, 114, 240);
		ctx.lineTo(19, 265);
		ctx.lineTo(19, 310);
		ctx.lineTo(277, 310);
		ctx.lineTo(277, 265);
		ctx.lineTo(176, 240);
		ctx.quadraticCurveTo(171, 217, cx + 29, cy - 23);
		ctx.stroke();
		ctx.fillStyle = skinColor;
		ctx.fill();

		drawClothes(ctx);
	}

	static drawClothes(ctx) {
		ctx.beginPath();
		ctx.moveTo(113, 266);
		ctx.lineTo(125, 269);
		ctx.quadraticCurveTo(153, 255, 158, 256);
		ctx.quadraticCurveTo(195, 251, 200, 239);
		ctx.quadraticCurveTo(219, 229, 220, 244);
		ctx.quadraticCurveTo(221, 263, 161, 275);
		ctx.moveTo(220, 249);
		ctx.quadraticCurveTo(277, 263, 278, 264);
		ctx.quadraticCurveTo(286, 274, 288, 300);
		ctx.lineTo(6, 300);
		ctx.quadraticCurveTo(14, 268, 18, 264);
		ctx.quadraticCurveTo(78, 244, 80, 245);
		ctx.quadraticCurveTo(82, 215, 106, 239);
		ctx.quadraticCurveTo(116, 247, 119, 249);
		ctx.quadraticCurveTo(152, 254, 150, 259);
		ctx.fillStyle = clothesColor;
		ctx.fill();
		ctx.stroke();
	}

	static drawPoint(ctx, x, y, label, rad = 7) {
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
}