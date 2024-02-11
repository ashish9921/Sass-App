import AppIcon from './AppIcon';
import './AppIntElem.scss';

function AppIntElem({ label }: { label: number | string }) {
	return (
		<button className="int-elem">
			<AppIcon name="chevron" size={10} color="#4661E6" />
			<span>{label}</span>
		</button>
	);
}

export default AppIntElem;
