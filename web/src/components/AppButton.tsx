import { Link } from 'react-router-dom';
import './AppButton.scss';
import AppIcon from './AppIcon';

function AppButton({
	type = 'primary',
	icon,
	label,
	to,
	onClick: onClickHandler,
}: {
	type?: 'primary' | 'secondary' | 'neutral' | 'danger';
	icon?: 'plus';
	label: string;
	to?: string;
	onClick?: Function;
}) {
	return to === undefined ? (
		<button className={`app-button ${type}`} onClick={(e) => onClickHandler && onClickHandler(e)}>
			{icon && <AppIcon name={icon} size={14} color="white" />}
			<span>{label}</span>
		</button>
	) : (
		<Link to={to} className={`app-button ${type}`} onClick={(e) => onClickHandler && onClickHandler(e)}>
			{icon && <AppIcon name={icon} size={14} color="white" />}
			<span>{label}</span>
		</Link>
	);
}

export default AppButton;
