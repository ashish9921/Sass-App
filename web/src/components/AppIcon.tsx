import './AppIcon.scss';
// @ts-ignore
import Plus from '../assets/icons/plus.svg?react';
// @ts-ignore
import Bulb from '../assets/icons/bulb.svg?react';
// @ts-ignore
import Chevron from '../assets/icons/chevron.svg?react';
// @ts-ignore
import Pen from '../assets/icons/pen.svg?react';
// @ts-ignore
import Comment from '../assets/icons/comment.svg?react';

const iconMap = {
	plus: <Plus />,
	bulb: <Bulb />,
	chevron: <Chevron />,
	pen: <Pen />,
	comment: <Comment />,
};

type IconType = keyof typeof iconMap;

function AppIcon({ name, size = 48, color = 'black' }: { name: IconType; size?: number; color?: string }) {
	return (
		<span className="app-icon" style={{ width: `${size}px`, height: `${size}px`, fill: color }}>
			{iconMap[name]}
		</span>
	);
}

export default AppIcon;
