import React             from 'react';
import Canvas            from './Canvas';
import DrawAvatarService from '../services/DrawAvatarService';

const { drawAvatar } = new DrawAvatarService();

const CanvasController = ({ ax, ay, ...props }) => {
	const points = {
		bx: ax + (145 - ax) * 0.8,
		by: ay + (145 - ay) * 0.7 - 100,
		cx: ax + (145 - ax) * 0.8,
		cy: ay + (145 - ay) * 0.5 + 85
	};

	const drawAvatarWithParameters = (ctx) => {
		return drawAvatar(ctx, points, ax, ay);
	};

	return (
		<Canvas draw={drawAvatarWithParameters} width={300} height={300}/>
	);
};

export default CanvasController;